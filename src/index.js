import { createServer } from "graphql-yoga";
import { v4 as uuidv4 } from "uuid";

// Scalar types :: String, Boolean, Int, Float, ID

// Demo user data
const users = [
  {
    id: "1",
    name: "Noah",
    email: "noah@example.com",
    age: 29,
  },
  {
    id: "2",
    name: "Andrew",
    email: "andrew@example.com",
    age: 27,
  },
  {
    id: "3",
    name: "Mike",
    email: "mike@example.com",
  },
];

const posts = [
  {
    id: "10",
    title: "GraphQL 101",
    body: "This is how to use graphql 101",
    published: true,
    author: "1",
  },
  {
    id: "11",
    title: "GraphQL 201",
    body: "This is how to use graphql 201",
    published: false,
    author: "1",
  },
  {
    id: "12",
    title: "GraphQL 301",
    body: "This is how to use graphql 301",
    published: false,
    author: "2",
  },
];

const comments = [
  {
    id: "1",
    text: "comment 1",
    author: "1",
    post: "10",
  },
  {
    id: "2",
    text: "comment 2",
    author: "1",
    post: "10",
  },
  {
    id: "3",
    text: "comment 3",
    author: "2",
    post: "11",
  },
  {
    id: "4",
    text: "comment 4",
    author: "1",
    post: "10",
  },
];

// Type definitions (schema)
const typeDefs = `
    type Query {
        me: User!
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments(query: String): [Comment!]!
    }

    type Mutation {
      createUser(name: String!, email: String!, age: Int): User!
    }

    type User {
      id: ID!
      name: String!
      email: String!
      age: Int
      posts: [Post!]!
      comments: [Comment!]!
    }

    type Post {
      id: ID!
      title: String
      body: String!
      published: Boolean!
      author: User!
      comments: [Comment!]!
    }

    type Comment {
      id: ID!
      text: String!
      author: User!
      post: Post!
    }
`;

// Resolvers
const resolvers = {
  Query: {
    users: (parent, args, ctx, info) => {
      return !args.query
        ? users
        : users.filter((user) => {
            return user.name.toLowerCase().includes(args.query.toLowerCase());
          });
    },
    me: () => {
      return { id: "123098", name: "Noah", email: "noah@example.com", age: 28 };
    },
    posts: (parent, args, ctx, info) => {
      return !args.query
        ? posts
        : posts.filter((post) => {
            return post.title.toLowerCase().includes(args.query.toLowerCase());
          });
    },
    comments: (parent, args, ctx, info) => {
      return !args.query
        ? comments
        : comments.filter((comment) => {
            return comment.text
              .toLowerCase()
              .includes(args.query.toLowerCase());
          });
    },
  },
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some((user) => user.email === args.email);

      if (emailTaken) {
        throw new Error("Email taken.");
      }

      const user = {
        id: uuidv4(),
        name: args.name,
        email: args.email,
        age: args.age,
      };

      users.push(user);

      return user;
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      // console.log(parent);
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.post === parent.id;
      });
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => {
        return parent.id === post.author;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.author === parent.id;
      });
    },
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
    post(parent, args, ctx, info) {
      return posts.find((post) => {
        return post.id === parent.post;
      });
    },
  },
};

const server = createServer({
  schema: {
    typeDefs,
    resolvers,
  },
});

server.start(() => {
  console.log("The server is up!");
});
