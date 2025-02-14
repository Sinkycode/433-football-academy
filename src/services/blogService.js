import hygraphClient from "../lib/graphql";
import { GET_ALL_BLOGS } from "../graphql/queries";

export async function getAllPosts() {
  try {
    const { blogs } = await hygraphClient.request(GET_ALL_BLOGS);
    return blogs;
  } catch (error) {
    console.error("Error fetching posts:", error || error.message);
    return [];
  }
}
