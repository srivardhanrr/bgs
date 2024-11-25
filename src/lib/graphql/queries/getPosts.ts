export const GET_POSTS = `
  query GetPosts {
    posts(first: 10) {
      nodes {
        id
        title
        date
        slug
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;