import { createServer } from "graphql-yoga";

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

// Type definitions (schema)
const typeDefs = `
    type Query {
        me: User!
        users(query: String): [User!]!
    }

    type User {
      id: ID!
      name: String!
      email: String!
      age: Int
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
