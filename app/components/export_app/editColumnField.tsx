import { BlockStack, Tag, Autocomplete } from "@shopify/polaris";
import { useState, useCallback, useMemo, useEffect } from "react";
import { default_product_field } from "~/ultils/constant/templates";
import { getArrObjectFromData } from "~/ultils/func/func";

interface EditColumnFieldProps {
  data: unknown[];
  titleTable: {
    type: string;
    value: string;
  }[];
  handleRemoveTagTitle: (title: string) => void;
  handleAddColumn: (title: string) => void;
}

const EditColumnField: React.FC<EditColumnFieldProps> = ({
  data,
  titleTable,
  handleRemoveTagTitle,
  handleAddColumn,
}) => {
  const deselectedOptions = useMemo(() => {
    const keyObjectData = Object.keys((data as object[])?.[0]);
    return getArrObjectFromData(keyObjectData);
  }, [data]);
  const resultArray = useMemo(() => {
    return titleTable?.map((item) => item.type);
  }, [titleTable]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(resultArray);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState(deselectedOptions);

  const updateText = useCallback(
    (value: string) => {
      setInputValue(value);

      if (value === "") {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(value, "i");
      const resultOptions = deselectedOptions?.filter((option) =>
        option.label.match(filterRegex),
      );

      setOptions(resultOptions);
    },
    [deselectedOptions],
  );

  const removeTag = useCallback(
    (tag: string) => () => {
      const options = [...selectedOptions];
      options.splice(options.indexOf(tag), 1);
      setSelectedOptions(options);
      handleRemoveTagTitle(tag);
    },
    [selectedOptions],
  );

  useEffect(() => {
    const selectOptions = titleTable?.map((item) => item.type);
    setSelectedOptions(selectOptions);
  }, [titleTable]);

  const verticalContentMarkup =
    selectedOptions.length > 0 ? (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          marginBottom: "20px",
        }}
      >
        {selectedOptions.map((option) => {
          let tagLabel = "";
          tagLabel = option.replace("_", " ");
          // tagLabel = titleCase(tagLabel);
          return (
            <Tag key={`option${option}`} onRemove={removeTag(option)}>
              {tagLabel}
            </Tag>
          );
        })}
      </div>
    ) : null;

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label="Column"
      value={inputValue}
      placeholder="Edit column"
      verticalContent={verticalContentMarkup}
      autoComplete="off"
    />
  );

  return (
    <div style={{ marginBottom: "20px" }}>
      <Autocomplete
        allowMultiple
        options={options}
        selected={selectedOptions}
        textField={textField}
        onSelect={(val) => {
          setSelectedOptions(val);
          if (val.length < titleTable.length) {
            handleRemoveTagTitle(titleTable[titleTable.length - 1].type);
          } else {
            handleAddColumn(val[val?.length - 1]);
          }
        }}
        listTitle="Suggested Tags"
      />
    </div>
  );

  // function titleCase(string: string) {
  //   return string
  //     .toLowerCase()
  //     .split(" ")
  //     .map((word) => word.replace(word[0], word[0].toUpperCase()))
  //     .join("");
  // }
};

export default EditColumnField;
