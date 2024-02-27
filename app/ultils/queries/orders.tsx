export const GET_DEFAULT_ORDERS = `#graphql
  query {
    orders(first: 10) {
      edges {
        node {
          id
          name
          email
          createdAt
          updatedAt
          totalWeight
          lineItems(first: 5) {
            edges {
              node {
                title
                variant {
                  id
                  title
                  sku
                  product {
                    id
                    title
                  }
                }
                quantity
              }
            }
          }
          shippingAddress {
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
          billingAddress {
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
