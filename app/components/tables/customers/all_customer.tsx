import React, { useState, useCallback } from "react";
import {
  ChoiceList,
  TextField,
  Card,
  Filters,
  DataTable,
} from "@shopify/polaris";

interface Filter {
  key: string;
  label: string;
  choices: { label: string; value: string }[];
}

interface Props {
  filtersData: Filter[];
}

const AllCustomerTable: React.FC<Props> = ({ filtersData }) => {
  const [filters, setFilters] = useState<{ [key: string]: string[] }>({});
  const [queryValue, setQueryValue] = useState("");

  const handleFilterChange = useCallback(
    (key: string, value: string[]) =>
      setFilters((prevFilters) => ({ ...prevFilters, [key]: value })),
    [],
  );

  const handleFiltersQueryChange = useCallback(
    (value: string) => setQueryValue(value),
    [],
  );

  const handleFilterRemove = useCallback((key: string) => {
    setFilters((prevFilters) => {
      const { [key]: removedKey, ...updatedFilters } = prevFilters;
      return updatedFilters;
    });
  }, []);

  const handleFiltersClearAll = useCallback(() => {
    setFilters({});
    setQueryValue("");
  }, []);

  const appliedFilters = Object.keys(filters).map((key) => ({
    key,
    label: `Filter: ${key} - ${filters[key].join(", ")}`,
    onRemove: () => handleFilterRemove(key),
  }));

  return (
    <div style={{ height: "568px" }}>
      <Card>
        <Filters
          queryValue={queryValue}
          queryPlaceholder="Search items"
          filters={filtersData.map(({ key, label, choices }) => ({
            key,
            label,
            filter: (
              <>
                {/* <ChoiceList
                  title={label}
                  titleHidden
                  choices={choices}
                  selected={filters[key] || []}
                  onChange={(value) => handleFilterChange(key, value)}
                  allowMultiple
                /> */}
                <div>
                    TétÏ
                </div>
              </>
            ),
            shortcut: true,
          }))}
          appliedFilters={appliedFilters}
          onQueryChange={handleFiltersQueryChange}
          onQueryClear={() => setQueryValue("")}
          onClearAll={handleFiltersClearAll}
        />
        <DataTable
          columnContentTypes={[
            "text",
            "numeric",
            "numeric",
            "numeric",
            "numeric",
          ]}
          headings={[
            "Product",
            "Price",
            "SKU Number",
            "Net quantity",
            "Net sales",
          ]}
          rows={[
            ["Emerald Silk Gown", "$875.00", "124689", "140", "$122,500.00"],
            ["Mauve Cashmere Scarf", "$230.00", "124533", "83", "$19,090.00"],
            [
              "Navy Merino Wool Blazer with khaki chinos and yellow belt",
              "$445.00",
              "124518",
              "32",
              "$14,240.00",
            ],
          ]}
          totals={["", "", "", "255", "$155,830.00"]}
        />
      </Card>
    </div>
  );
};

export default AllCustomerTable;
