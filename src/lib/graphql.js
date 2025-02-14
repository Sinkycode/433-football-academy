import { GraphQLClient } from "graphql-request";

const hygraphClient = new GraphQLClient(import.meta.env.VITE_HYGRAPH_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_HYGRAPH_TOKEN}`,
  },
});

// console.log("Hygraph Endpoint:", import.meta.env.VITE_HYGRAPH_ENDPOINT);
// console.log("Hygraph Token:", import.meta.env.VITE_HYGRAPH_TOKEN);

export default hygraphClient;
