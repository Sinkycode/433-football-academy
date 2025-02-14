export const GET_ALL_BLOGS = `
 query {
  blogs(where: {}) {
    date
    id
    title
    slug
    readTime
    postCategory
    content {
      text
    }
    postImage {
      id
      fileName
      url
    }
    author {
      name
      picture {
        url
      }
    }
  }
}
`;
