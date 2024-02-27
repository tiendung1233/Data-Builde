import { TextField, ChoiceList, Button } from "@shopify/polaris";
import { useState, useCallback, useEffect } from "react";
import { useOutletContext } from "@remix-run/react";

const ChoiceListTextField: React.FC<{ name: string }> = ({ name }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [textFieldValue, setTextFieldValue] = useState("");
  const outletContext: {
    filters: any[];
    setFilters: React.Dispatch<React.SetStateAction<any[]>>;
  } = useOutletContext();
  const { filters, setFilters } = outletContext;
  const choiceFilter = filters?.filter(
    (item: { field: string }) => item?.field === name,
  );

  const handleChoiceListChange = (value: string[]) => {
    setSelected(value);
  };

  const handleTextFieldChange = useCallback(
    (value: string) => setTextFieldValue(value),
    [],
  );

  const renderChildren = useCallback(
    (isSelected: boolean) =>
      isSelected && (
        <TextField
          label="Minimum Quantity"
          labelHidden
          onChange={handleTextFieldChange}
          value={textFieldValue || choiceFilter[0]?.val || ""}
          autoComplete="off"
        />
      ),
    [handleTextFieldChange, textFieldValue],
  );

  useEffect(() => {
    const newDataFilter = filters?.filter(
      (item: { field: string }) => item?.field === name,
    );
    setTextFieldValue(newDataFilter[0]?.val);
  }, [filters]);

  return (
    <>
      <ChoiceList
        title={"Filter" + " " + name}
        choices={[
          { label: "Blank", value: "blank" },
          { label: "Not blank", value: "not_blank" },
          { label: "Is", value: "is", renderChildren },
          { label: "Is not", value: "is_not", renderChildren },
          { label: "Contains", value: "contains", renderChildren },
          { label: "Not contains", value: "not_contains", renderChildren },
          { label: "Begins with", value: "begins_with", renderChildren },
          { label: "End with", value: "end_with", renderChildren },
          { label: "Equal", value: "equal", renderChildren },
          { label: "Not equal", value: "not_equal", renderChildren },
          { label: "Greater than", value: "greater_than", renderChildren },
          { label: "Lesser than", value: "lesser_than", renderChildren },
          { label: ">=", value: "greater_than_or_equal", renderChildren },
          { label: "<=", value: "lesser_than_or_equal", renderChildren },
        ]}
        selected={
          selected?.length > 0 ? selected : choiceFilter[0]?.filter || [""]
        }
        onChange={handleChoiceListChange}
      />
      <br />
      <div style={{ display: "flex", gap: "10px" }}>
        <Button
          onClick={() => {
            const newDataFilter = filters?.filter(
              (item: { field: string }) => item?.field !== name,
            );
            newDataFilter.push({
              filter: selected[0],
              field: name,
              val: textFieldValue,
            });
            if (
              !filters?.some(
                (item: { field: string; filter: string }) =>
                  item?.field === name && item?.filter === selected[0],
              )
            ) {
              setFilters(newDataFilter);
            }
          }}
          variant="primary"
          size="slim"
        >
          Add filter
        </Button>
        {choiceFilter?.length > 0 && (
          <Button
            onClick={() => {
              const newDataFilter = filters?.filter(
                (item: { field: string }) => item?.field !== name,
              );
              setFilters(newDataFilter);
            }}
            variant="tertiary"
            size="slim"
            tone="critical"
          >
            Remove filter
          </Button>
        )}
      </div>
    </>
  );
};

export default ChoiceListTextField;
