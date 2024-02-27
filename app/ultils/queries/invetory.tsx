export const GET_DEFAULT_INVENTORY = `#graphql
  query {
    inventoryLevels(first: 10) {
      edges {
        node {
          id
          inventoryItem {
            id
            variant {
              id
              product {
                id
                title
              }
            }
          }
          location {
            id
            name
          }
          available
          allocated
          updatedAt
        }
      }
    }
  }
`;
