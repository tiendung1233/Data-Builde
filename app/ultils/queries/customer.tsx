export const GET_ALL_DEFAULT_CUSTOMERS = `#graphql
  query {
    customers(first: 10) {
      edges {
        node {
          id
          displayName
          email
          createdAt
          updatedAt
          phone
          defaultAddress {
            id
            firstName
            lastName
            company
            address1
            address2
            city
            province
            country
            zip
          }
        }
      }
    }
  }
`;
