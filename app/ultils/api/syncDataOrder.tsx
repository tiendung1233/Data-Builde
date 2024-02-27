import { GET_DEFAULT_ORDERS } from "../queries/orders";
import { getDataResponse } from "./response";

export const syncDataOrderrFollowingCondition = async (
  condition: string,
  admin: { graphql: (arg0: string) => any },
) => {
  switch (condition) {
    case "order-default":
      const rawDataOrder = await getDataResponse(
        admin,
        GET_DEFAULT_ORDERS,
        "orders",
      );
      return rawDataOrder;
    default:
      return null;
  }
};
