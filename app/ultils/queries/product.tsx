export const GET_DEFAULT_PRODUCT = `#graphql
query {
  products(first: 10) {
    edges {
      node {
        id
        title
        bodyHtml
        vendor
        productType
        createdAt
        handle
        updatedAt
        publishedAt
        templateSuffix
        tags
        status
        totalInventory
        description
        descriptionHtml
        publicationCount
        onlineStoreUrl
        isGiftCard
        hasOutOfStockVariants
        vendor
        options {
          id
          name
          position
          values
        }
      }
    }
  }
}`;

export const GET_ALL_PRODUCT = `#graphql
query {
  products(first: 1) {
    edges {
      node {
        id
        title
        bodyHtml
        vendor
        createdAt
        handle
        updatedAt
        publishedAt
        tags
        status
        totalInventory
        productType
        description
        descriptionHtml
        publicationCount
        onlineStoreUrl
        hasOutOfStockVariants
        vendor
        priceRangeV2 {
          maxVariantPrice {
            amount
          }
          minVariantPrice{
            amount
          }
        }
        options {
          id
          name
          position
          values
        }
        variants(first: 100) {
          edges {
            node {
              id
              title
              sku
              createdAt
              updatedAt
              taxable
              weight
              weightUnit
              inventoryQuantity
              price
              taxCode
              requiresShipping
            }
          }
        }
        collections(first: 1){
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
}`;
