export async function initAppConfigs(db: any, result: any) {
    let actionResult = false;
    const isExistentInAppConfigs = await db?.UserAccount?.findFirst({
        where: { shop: { equals: result.data.shop.myshopifyDomain } },
    });
    const appConfigsData = {
        shop: result.data.shop.myshopifyDomain,
        shopifyExports: [],
        username: result.data.shop.name,
        packageName: "free",
        paymentHistories: []
    };
    if (!isExistentInAppConfigs) {
        actionResult = await db?.UserAccount?.create({
            data: appConfigsData,
        });
    }
    return actionResult;
}

export async function installApp(db: any, graphql: any) {
    const GET_SHOP_QUERY_GRAPHQL =
        `#graphql
          query {
            shop {
              myshopifyDomain
            }
          }`;
    const response = await graphql(GET_SHOP_QUERY_GRAPHQL);
    const result = await response.json()
    await initAppConfigs(db, result)
}