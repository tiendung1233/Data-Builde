import { useLoaderData, useOutletContext } from "@remix-run/react";
import {
  DataTable,
  TableData,
  Card,
  TextField,
  Button,
  ColumnContentType,
} from "@shopify/polaris";
import { ExportMinor } from "@shopify/polaris-icons";
import { useState, useCallback, FC, useEffect, useMemo } from "react";
import AddFilterFieldCustom from "~/components/export_app/addFilterFieldCustom";
import HeadingCustomTable from "~/components/export_app/headingCustomeTable";
import EditColumnField from "~/components/export_app/editColumnField";
import Loading from "~/components/commons/loading";
import {
  defaultHeadingProduct,
  defaultPopoverProduct,
} from "~/ultils/constant/data";
import { default_product_field } from "~/ultils/constant/templates";
import {
  convertTimeToString,
  exportToCSV,
  exportToExcel,
  filterData,
  filterDefaultData,
  getArrObjectFromData,
} from "~/ultils/func/func";
import DateRangePicker from "~/components/export_app/dateTimePicker";
import SortButton from "~/components/export_app/sortButton";
import ExportButton from "~/components/export_app/exportButton";

interface TableProps {
  data?: any[];
  loading?: boolean;
  defaultValue ?: string
}

const SortableDataTableDefaultProduct: FC<TableProps> = ({
  data = [],
  loading = false,
  defaultValue
}) => {
  const [valueInput, setValueInput] = useState<any>(defaultHeadingProduct);
  const [value, setValue] = useState("Default");
  const [popoverActive, setPopoverActive] = useState(defaultPopoverProduct);
  const [popoverFilterActive, setPopoverFilterActive] = useState(false);
  const [renderTime, setRenderTime] = useState(0);
  const [headingField, setHeadingField] = useState(default_product_field);
  const [sortField, setSortField] = useState<{
    field: string;
    sortBy: string;
    type: "string" | "number";
  }>({ field: "", sortBy: "", type: "string" });
  const arraySorted = Array.from({ length: 25 }).fill(true);
  const { filters, setFilters } = useOutletContext() as any;
  const [inputValues, setInputValues] = useState<{
    since?: string;
    until?: string;
  }>({});
  const [columnContentTypes, setColumnContentTypes] = useState([
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
  ]);
  const dataTable = data?.map((item) => {
    return [
      item.title || "",
      item.bodyHtml || "",
      item.vendor || "",
      item.productType || "",
      convertTimeToString(item.createdAt) || "",
      item.handle || "",
      convertTimeToString(item.updatedAt) || "",
      convertTimeToString(item.publishedAt) || "",
      item.status || "",
      item.totalInventory || "",
      item.description || "",
      item.publicationCount || "",
      item.onlineStoreUrl || "",
    ];
  });
  const [sortedRows, setSortedRows] = useState<TableData[][]>(dataTable);
  const [defaultRows, setDefaultRows] = useState<TableData[][]>(dataTable);

  const rows = renderTime > 1 ? sortedRows : (dataTable as TableData[][]);
  const headingFiledSort = headingField.map((item) => item.value);

  const checkIsNumberType = (rows: TableData[][], index: number) => {
    return rows.some(
      (rowA) => !isNaN(Number(rowA[index])) && rowA[index] != "",
    );
  };

  const handleAddColumn = (title: string) => {
    const newContentType = [...columnContentTypes];
    newContentType.push("text");
    const newHeadingFields = [...headingField];
    newHeadingFields.push({
      type: title,
      value: getArrObjectFromData([title])[0].label,
    });
    setHeadingField(newHeadingFields);
    const newData =
      defaultRows?.length > 0
        ? [...defaultRows]
        : [...(dataTable as TableData[][])];

    const dataAdd = data?.map((item) => {
      return [item?.[title] || ""];
    });
    const result = newData.map((subArray, index) => [
      ...subArray,
      ...dataAdd[index],
    ]);
    setSortedRows(result);
    setDefaultRows(result);
  };

  const handleChangeHeading = (keyName: string, val: string) => {
    setValueInput((prev: any) => {
      return {
        ...prev,
        [keyName]: val,
      };
    });
  };

  const handleDelHeading = (index: number) => {
    const newContentType = [...columnContentTypes];
    const newHeadingFields = [...headingField];
    const newDataFilter = filters?.filter(
      (item: { field: string }) => item?.field !== newHeadingFields[index].type,
    );
    setFilters(newDataFilter);
    const newData =
      defaultRows?.length > 0
        ? [...defaultRows]
        : [...(dataTable as TableData[][])];

    if (newHeadingFields.length === 1) {
      alert("At least 1 field is required in the data table.");
      return;
    }
    const newSortData = newData.map((subArray) =>
      subArray.filter((_, i) => i !== index),
    );
    newContentType.splice(index, 1);
    newHeadingFields.splice(index, 1);
    setColumnContentTypes(newContentType);
    setHeadingField(newHeadingFields);
    setSortedRows(newSortData);
    setDefaultRows(newSortData);
  };

  const handleRemoveTagTitle = (title: string) => {
    const indexTitle = headingField.findIndex((item) => item.type === title);
    handleDelHeading(indexTitle);
  };

  const headings = headingField?.map((item, i) => (
    <HeadingCustomTable
      key={i}
      type={item.type}
      value={valueInput?.[item.type] || item.value}
      handleChangeHeading={handleChangeHeading}
      popoverActive={popoverActive}
      setPopoverActive={setPopoverActive}
      handleDelHeading={handleDelHeading}
      index={i}
    />
  ));

  const handleSort = (index: number, direction: "ascending" | "descending") => {
    const isNumberType = checkIsNumberType(rows, index);
    const field = rows.map((rowA) => rowA[index]);
    setSortField({
      sortBy: direction,
      field: field[0] as string,
      type: isNumberType ? "number" : "string",
    });
    setSortedRows(sortCurrency(rows, index, direction));
  };

  const handleChange = useCallback(
    (newValue: string) => setValue(newValue),
    [],
  );

  const handleExport = (type: string) => {
    const columnHeaders = headingField.map((item) => item.value);
    if (type.toLowerCase() === "csv") {
      exportToCSV(rows, value, columnHeaders);
    } else {
      exportToExcel(rows, `${value}.xlsx`, value, columnHeaders);
    }
  };

  useEffect(() => {
    setDefaultRows(dataTable);
    setRenderTime(renderTime + 1);
  }, []);

  useEffect(() => {
    setRenderTime(renderTime + 1);
  }, [headingField, columnContentTypes, sortField]);

  useEffect(() => {
    if (filters?.length > 0) {
      setRenderTime(renderTime + 1);
    }
    const checkFieldExist = filters.every((el: any) => {
      const fieldIndex = headingField.findIndex(
        (item) => item.type === el.field,
      );
      if (fieldIndex === -1) return false;
      return true;
    });

    if (checkFieldExist) {
      const dataFiltered = filterData(
        sortedRows?.length > 0 ? sortedRows : defaultRows || dataTable,
        filters,
        headingField,
        inputValues as {
          since: string;
          until: string;
        },
      );
      // console.log("dataFiltered", dataFiltered);
      setSortedRows(dataFiltered);
    } else {
      const newDataFilter = filters;
      newDataFilter.pop();
      setFilters(newDataFilter);
    }
  }, [
    filters,
    headingField,
    valueInput,
    columnContentTypes,
    inputValues.since,
    inputValues.until,
  ]);

  return (
    <div style={{ marginTop: "50px" }}>
      {defaultValue && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <TextField
              label="Table Name"
              value={value}
              onChange={handleChange}
              autoComplete="off"
            />
            <div style={{ height: "32px", display: "flex", gap: "10px" }}>
              <Button variant="primary" size="slim">
                Save table
              </Button>
              <Button variant="secondary" size="slim">
                Schedule
              </Button>
              {/* <Button
                onClick={() => {
                  handleExport("csv");
                }}
                variant="secondary"
                size="slim"
                icon={ExportMinor}
              >
                Export
              </Button> */}
              <ExportButton handleExport = {handleExport}/>
              <Button
                onClick={() => {
                  setFilters([]);
                  setSortedRows(dataTable);
                  setValueInput(defaultHeadingProduct);
                  setHeadingField(default_product_field);
                  setPopoverActive(defaultPopoverProduct);
                  setSortField({ field: "", sortBy: "", type: "string" });
                  setInputValues({});
                  setRenderTime(0);
                }}
                variant="plain"
                tone="critical"
                size="slim"
              >
                New report
              </Button>
            </div>
          </div>
          <br />
        </>
      )}
      {loading ? (
        <Loading />
      ) : (
        <>
          {data?.length && data?.length > 0 ? (
            <div style={{ width: "100%", marginTop: "20px", margin: "auto" }}>
              <Card>
                <EditColumnField
                  data={data}
                  titleTable={headingField}
                  handleRemoveTagTitle={handleRemoveTagTitle}
                  handleAddColumn={handleAddColumn}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <AddFilterFieldCustom
                    value={""}
                    handleSetFilter={() => {}}
                    data={valueInput}
                    popoverActive={popoverFilterActive}
                    setPopoverActive={setPopoverFilterActive}
                  />
                  <DateRangePicker
                    inputValues={inputValues}
                    setInputValues={setInputValues}
                  />
                </div>
                <br />
                <SortButton fields={headingFiledSort} onSort={handleSort} />
                <br />
                <DataTable
                  columnContentTypes={columnContentTypes as ColumnContentType[]}
                  headings={headings}
                  rows={
                    renderTime > 1 ? sortedRows : (dataTable as TableData[][])
                  }
                  verticalAlign="middle"
                  truncate={true}
                  pagination={{
                    hasNext: true,
                    onNext: () => {},
                  }}
                />
              </Card>
            </div>
          ) : (
            <div>
              <h1
                style={{
                  textAlign: "center",
                  fontSize: "24px",
                  marginBottom: "20px",
                  // fontFamily: "Inter",
                  color: "#303030",
                }}
              >
                No Data
              </h1>
              <img
                style={{ margin: "auto", display: "block" }}
                src="/no_data.svg"
                alt="Black choker necklace"
              />
            </div>
          )}
        </>
      )}
    </div>
  );

  function sortCurrency(
    rows: TableData[][],
    index: number,
    direction: "ascending" | "descending",
  ): TableData[][] {
    const stringSorted = [...rows].sort((rowA, rowB) => {
      const amountA = (rowA[index] || 0).toString();
      const amountB = (rowB[index] || 0).toString();

      return direction === "descending"
        ? amountB.localeCompare(amountA)
        : amountA.localeCompare(amountB);
    });

    const isNumberType = checkIsNumberType(rows, index);
    if (!isNumberType) return stringSorted;

    return [...rows].sort((rowA, rowB) => {
      const amountA = parseFloat(
        (!isNaN(Number(rowA[index])) && rowA[index] != ""
          ? Number(rowA[index])
          : 0
        )
          .toString()
          .substring(1),
      );
      const amountB = parseFloat(
        (!isNaN(Number(rowB[index])) && rowB[index] != ""
          ? Number(rowB[index])
          : 0
        )
          .toString()
          .substring(1),
      );
      return direction === "descending" ? amountB - amountA : amountA - amountB;
    });
  }
};

export default SortableDataTableDefaultProduct;
