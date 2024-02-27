export const getDataResponse = async (
  admin: { graphql: (arg0: string) => any },
  query: string,
  field: string,
) => {
  const responseProduct = await admin.graphql(query);
  const rawData = await responseProduct.json();
  return rawData?.data?.[field]?.edges?.map((edge: any) => edge?.node);
};
