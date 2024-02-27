import { GET_DEFAULT_INVENTORY } from "../queries/invetory";
import { getDataResponse } from "./response";

export const syncDataInventoryFollowingCondition = async (
  condition: string,
  admin: { graphql: (arg0: string) => any },
) => {
  switch (condition) {
    case "inventory-default":
      const rawDataInventory = await getDataResponse(
        admin,
        GET_DEFAULT_INVENTORY,
        "inventories",
      );
      return rawDataInventory;
    default:
      return null;
  }
};
