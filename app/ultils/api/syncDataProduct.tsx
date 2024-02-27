import { GET_ALL_DEFAULT_CUSTOMERS } from "../queries/customer";
import { GET_ALL_PRODUCT, GET_DEFAULT_PRODUCT } from "../queries/product";
import { getDataResponse } from "./response";

export const syncDataProductFollowingCondition = async (
  condition: string,
  admin: { graphql: (arg0: string) => any },
  cursor?: string,
) => {
  switch (condition) {
    case "product-default":
      const rawDataProduct = await getDataResponse(
        admin,
        GET_DEFAULT_PRODUCT,
        "products",
      );
      return rawDataProduct;

    case "product-all":
      return await getDataResponse(admin, GET_ALL_PRODUCT, "products");
    default:
      return null;
  }
};
