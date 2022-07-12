import { createServer } from "graphql-yoga";

// Scalar types :: String, Boolean, Int, Float, ID

// Type definitions (schema)
const typeDefs = `
    type Query {
        greeting(name: String, position: String): String!
        add(numbers: [Float!]!): Float!
        grades: [Int!]!
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
    greeting: (parent, args) =>
      !args.name || !args.position
        ? "Hello!"
        : `Hello ${args.position} ${args.name}!`,
    me: () => {
      return { id: "123098", name: "Noah", email: "noah@example.com", age: 28 };
    },
    add: (parent, args, ctx, info) => {
      return args.numbers.length === 0
        ? 0
        : args.numbers.reduce(
            (accumulator, currentValue) => accumulator + currentValue
          );
    },
    grades: (parent, args, ctx, info) => {
      return [99, 80, 93];
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
