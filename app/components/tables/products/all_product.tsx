import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { DataTable, TableData, Card } from "@shopify/polaris";
import { useState, useCallback } from "react";

export default function SortableDataTableAllProduct() {
  const [sortedRows, setSortedRows] = useState<TableData[][] | null>(null);

  const initiallySortedRows: TableData[][] = [
    ["Emerald Silk Gown", "$875.00", 124689, 140, "$122,500.00"],
    ["Mauve Cashmere Scarf", "$230.00", 124533, 83, "$19,090.00"],
    [
      "Navy Merino Wool Blazer with khaki chinos and yellow belt",
      "$445.00",
      124518,
      32,
      "$14,240.00",
    ],
  ];
  const rows = sortedRows ? sortedRows : initiallySortedRows;

  console.log("initiallySortedRows", initiallySortedRows)

  const handleSort = useCallback(
    (index: number, direction: "ascending" | "descending") =>
      setSortedRows(sortCurrency(rows, index, direction)),
    [rows],
  );

  return (
    <div style={{ marginTop: "50px" }}>
      <Card>
        <DataTable
          columnContentTypes={[
            "text",
            "text",
            "text",
            "text",
            "text",
            "text",
            "text",
            "text",
            "text",
            "text",
            "text",
            "text",
            "text",
            "text",
            "numeric",
            "numeric",
            "numeric",
          ]}
          headings={[
            "Product Title",
            "Variant Title",
            "SKU ",
            "Product Type",
            "Handle",
            "Meta description",
            "Custom Collections",
            "Smart Collections",
            "Option 1",
            "Option 2",
            "Option 3",
            "Vendor",
            "Tags",
            "Barcode",
            "Product cost",
            "Product Price",
            "Inventory Quantity",
          ]}
          rows={rows}
          totals={["", "", "", 255, "$155,830.00"]}
          sortable={[false, true, false, false, true]}
          defaultSortDirection="descending"
          initialSortColumnIndex={4}
          onSort={handleSort}
        />
      </Card>
    </div>
  );

  function sortCurrency(
    rows: TableData[][],
    index: number,
    direction: "ascending" | "descending",
  ): TableData[][] {
    return [...rows].sort((rowA, rowB) => {
      const amountA = parseFloat((rowA[index] || 0).toString().substring(1));
      const amountB = parseFloat((rowB[index] || 0).toString().substring(1));

      return direction === "descending" ? amountB - amountA : amountA - amountB;
    });
  }
}
