import { GET_ALL_DEFAULT_CUSTOMERS } from "../queries/customer";
import { getDataResponse } from "./response";

export const syncDataCustomerFollowingCondition = async (
  condition: string,
  admin: { graphql: (arg0: string) => any },
) => {
  switch (condition) {
    case "customer-default":
      const rawDataCus = await getDataResponse(
        admin,
        GET_ALL_DEFAULT_CUSTOMERS,
        "customers",
      );
      return rawDataCus;
    default:
      return null;
  }
};
