// src/lib/graphql/queries.ts
export const GET_POST_BY_SLUG = `
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      content
      date
      author {
        node {
          name
          slug
          avatar {
            url
          }
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      tags {
        nodes {
          name
          slug
        }
      }
    }
  }
`;

export const GET_AUTHOR = `
  query GetAuthor($slug: ID!) {
    user(id: $slug, idType: SLUG) {
      id
      name
      firstName
      lastName
      description
      avatar {
        url
      }
      posts(first: 100) {
        nodes {
          id
          title
          slug
          date
          excerpt
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
        }
      }
      # You can add more fields like social media links if they're available in your WordPress setup
    }
  }
`;