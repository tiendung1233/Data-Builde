import React, { useState } from "react";
import { Button, ButtonGroup, Select } from "@shopify/polaris";

type SortOption = {
  value: string;
  label: string;
};

type SortButtonProps = {
  fields: string[];
  onSort: (index: number, direction: "ascending" | "descending") => void;
};

const SortButton: React.FC<SortButtonProps> = ({ fields, onSort }) => {
  const [selectedField, setSelectedField] = useState<string>(fields[0]);
  const [selectedOrder, setSelectedOrder] = useState<string>("ascending");

  const sortOptions: SortOption[] = [
    { value: "ascending", label: "Ascending" },
    { value: "descending", label: "Descending" },
  ];

  const handleFieldChange = (value: string) => {
    setSelectedField(value);
  };

  const handleOrderChange = (value: string) => {
    setSelectedOrder(value);
  };

  const handleSort = () => {
    const indexField = fields.findIndex((item) => item === selectedField);
    onSort(indexField, selectedOrder as "ascending" | "descending");
  };

  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>
      <Select
        label="Sort by"
        options={fields.map((field) => ({ label: field, value: field }))}
        value={selectedField}
        onChange={handleFieldChange}
      />
      <Select
        label="Sort order"
        options={sortOptions}
        value={selectedOrder}
        onChange={handleOrderChange}
      />
      <Button onClick={handleSort}>Sort</Button>
    </div>
  );
};

export default SortButton;
