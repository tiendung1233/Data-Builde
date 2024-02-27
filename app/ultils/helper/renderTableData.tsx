import SortableDataTableDefaultProduct from "~/components/tables/products/default_product";

export const renderTableDataProduct = (type: string, data: any) => {
  switch (type) {
    case "product-default":
      return <SortableDataTableDefaultProduct />;
    case "product-total-sold":
      return <SortableDataTableDefaultProduct />;
    case "product-by-vendor":
      return <SortableDataTableDefaultProduct />;
    case "product-by-collection":
      return <SortableDataTableDefaultProduct />;
    case "product-never-sold":
      return <SortableDataTableDefaultProduct />;
    case "product-best-selling":
      return <SortableDataTableDefaultProduct />;
    case "product-best-collection":
      return <SortableDataTableDefaultProduct />;
    case "product-all":
      return <SortableDataTableDefaultProduct />;
    // case "product-default":
    //   return <SortableDataTableDefaultProduct />;
    default:
      return;
  }
};

export const renderTableDataInventory = (type: string, data: any) => {
  switch (type) {
    case "invetory-default":
      return <SortableDataTableDefaultProduct />;
    case "invetory-out-of-stock":
      return <SortableDataTableDefaultProduct />;
    case "invetory-low-stock":
      return <SortableDataTableDefaultProduct />;
    case "invetory-status":
      return <SortableDataTableDefaultProduct />;
    case "invetory-sale-value":
      return <SortableDataTableDefaultProduct />;
    case "invetory-reorder-point":
      return <SortableDataTableDefaultProduct />;
    case "invetory-on-hand":
      return <SortableDataTableDefaultProduct />;
    case "invetory-level-indicator":
      return <SortableDataTableDefaultProduct />;
    case "invetory-cost-report":
      return <SortableDataTableDefaultProduct />;
    case "invetory-by-product-type":
      return <SortableDataTableDefaultProduct />;
    case "invetory-by-location":
      return <SortableDataTableDefaultProduct />;
    case "invetory-collection-level":
      return <SortableDataTableDefaultProduct />;
    default:
      return;
  }
};

export const renderTableDataCustomer = (type: string, data: any) => {
  switch (type) {
    case "customer-default":
      return <SortableDataTableDefaultProduct />;
    case "customer-most-valuable":
      return <SortableDataTableDefaultProduct />;
    case "customer-first-time-vs-returning":
      return <SortableDataTableDefaultProduct />;
    case "customer-new":
      return <SortableDataTableDefaultProduct />;
    case "customer-by-location":
      return <SortableDataTableDefaultProduct />;
    case "customer-outstading-payment":
      return <SortableDataTableDefaultProduct />;
    case "customer-information":
      return <SortableDataTableDefaultProduct />;
    // case "product-default":
    //   return <SortableDataTableDefaultProduct />;
    default:
      return;
  }
};

export const renderTableDataTagAndCollection = (type: string, data: any) => {
  switch (type) {
    case "tc-default":
      return <SortableDataTableDefaultProduct />;
    case "tc-sale-by-product-tag":
      return <SortableDataTableDefaultProduct />;
    case "tc-sale-by-order-tag":
      return <SortableDataTableDefaultProduct />;
    case "tc-sale-by-customer-tag":
      return <SortableDataTableDefaultProduct />;
    case "tc-sale-by-collection-group":
      return <SortableDataTableDefaultProduct />;
    case "tc-sale-mkt":
      return <SortableDataTableDefaultProduct />;
    case "tc-attribued-to-each-collection":
      return <SortableDataTableDefaultProduct />;
    // case "product-default":
    //   return <SortableDataTableDefaultProduct />;
    default:
      return;
  }
};
