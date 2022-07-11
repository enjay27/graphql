import { createServer } from "graphql-yoga";

// Scalar types :: String, Boolean, Int, Float, ID

// Type definitions (schema)
const typeDefs = `
    type Query {
        me: User!
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
