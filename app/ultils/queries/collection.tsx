export const GET_DEFAULT_COLLECTIONS = `#graphql
  query ($cursor: String) {
    collections(first: 10, after: $cursor) {
        pageInfo {
          hasNextPage
          endCursor
        }
      edges {
        node {
          id
          title
          handle
          description
          updatedAt
          products(first: 5) {
            edges {
              node {
                id
                title
              }
            }
          }
        }
      }
    }
  }
`;
