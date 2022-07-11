import { createServer } from "graphql-yoga";

// Scalar types :: String, Boolean, Int, Float, ID

// Type definitions (schema)
const typeDefs = `
    type Query {
        id: ID!
        name: String!
        age: Int!
        employed: Boolean!
        gpa: Float
    }
`;

// Resolvers
const resolvers = {
  Query: {
    id: () => "abc123",
    name: () => "Noah",
    age: () => 28,
    employed: () => true,
    gpa: () => null,
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
