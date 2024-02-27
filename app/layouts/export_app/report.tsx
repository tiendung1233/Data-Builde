import {
  useActionData,
  useLoaderData,
  useNavigation,
  useOutletContext,
  useSubmit,
} from "@remix-run/react";
import { ViewMajor, ExportMinor } from "@shopify/polaris-icons";
import {
  Autocomplete,
  BlockStack,
  Button,
  ButtonGroup,
  Card,
  Icon,
  InlineStack,
  Layout,
  Listbox,
  Spinner,
  Text,
  TextField,
} from "@shopify/polaris";
import { SearchMinor } from "@shopify/polaris-icons";
import { useState, useCallback, useMemo, useEffect } from "react";
import SortableDataTableDefaultProduct from "~/components/tables/products/default_product";
import { dataSearch, dataTitleReport } from "~/ultils/constant/data";
import { action, loader } from "../../routes/app.report";
import {
  CUSTOMER_TEMPLATE,
  ORDER_TEMPLATE,
  PRODUCT_TEMPLATE,
} from "~/ultils/constant/templates";
import SortableDataTableAllProduct from "~/components/tables/products/all_product";

export default function DataReport() {
  const navigation = useNavigation();
  // const currentURL = location.pathname;
  const { filters, setFilters } = useOutletContext() as any;
  const deselectedOptions = useMemo(() => dataSearch, []);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState(deselectedOptions);
  const [optionTiltle, setOptionTiltle] = useState("own");
  const [idAction, setIdAction] = useState("");
  const actionData = useActionData<typeof action>();
  const submit = useSubmit();
  const [value, setValue] = useState("");

  const loading =
    ["loading", "submitting"].includes(navigation.state) &&
    navigation.formMethod === "POST";

  const updateText = useCallback(
    (value: string) => {
      setInputValue(value);

      if (value === "") {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(value, "i");
      const resultOptions = deselectedOptions.filter((option) =>
        option.label.match(filterRegex),
      );
      setOptions(resultOptions);
    },
    [deselectedOptions],
  );

  // console.log("idAction", idAction);

  const updateSelection = useCallback(
    (selected: string[]) => {
      const selectedValue = selected.map((selectedItem) => {
        const matchedOption = options.find((option) => {
          return option.value.match(selectedItem);
        });
        return matchedOption && matchedOption.label;
      });

      setSelectedOptions(selected);
      setInputValue(selectedValue[0] || "");
    },
    [options],
  );

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label=""
      value={inputValue}
      prefix={<Icon source={SearchMinor} tone="base" />}
      placeholder="Search reports by name or tag"
      autoComplete="off"
    />
  );

  const dataTemplateOption = useMemo(() => {
    switch (optionTiltle) {
      case "product":
        return PRODUCT_TEMPLATE;
      case "customer":
        return CUSTOMER_TEMPLATE;
      case "tag_collection":
        return PRODUCT_TEMPLATE;
      case "fullfill_shipping":
        return PRODUCT_TEMPLATE;
      case "sales_order":
        return ORDER_TEMPLATE;
      case "inventory":
        return PRODUCT_TEMPLATE;
      case "tax":
        return PRODUCT_TEMPLATE;
      case "transition":
        return PRODUCT_TEMPLATE;
      case "payout":
        return PRODUCT_TEMPLATE;
      default:
        return null;
    }
  }, [optionTiltle]);

  const handleClickView = (typeAction: string, name: string) => {
    setIdAction(typeAction);
    setValue(name);
  };

  const fetchDataForTab = async () => {
    const formData = new FormData();
    formData.append("idAction", idAction);
    submit(formData, { replace: true, method: "POST" });
  };

  useEffect(() => {
    setFilters([]);
    fetchDataForTab();
    // console.log("actionData:  ", actionData);
  }, [idAction]);

  return (
    <>
      <div style={{ height: "50px" }}>
        <Autocomplete
          options={options}
          selected={selectedOptions}
          onSelect={updateSelection}
          textField={textField}
        />
      </div>
      <Layout>
        <Layout.Section variant="oneThird">
          <Card>
            <BlockStack gap="500">
              <Listbox
                accessibilityLabel="Basic Listbox example"
                onActiveOptionChange={(value) => {
                  setOptionTiltle(value);
                }}
              >
                {dataTitleReport?.map((item, index) => (
                  <Listbox.Option value={item.value} key={index}>
                    {item.label}
                  </Listbox.Option>
                ))}
              </Listbox>
            </BlockStack>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <BlockStack gap="500">
            <Card>
              <BlockStack gap="200">
                <Text as="h2" variant="headingMd">
                  Report template - {}
                </Text>
                <br />
                {optionTiltle === "own" ? (
                  <BlockStack gap="400" key={1}>
                    <InlineStack align="space-between">
                      <Text as="span" variant="bodyMd">
                        Mine
                      </Text>
                      <ButtonGroup>
                        <Button icon={ViewMajor}>View</Button>
                        <Button icon={ExportMinor}>Export</Button>
                      </ButtonGroup>
                    </InlineStack>
                  </BlockStack>
                ) : (
                  dataTemplateOption &&
                  dataTemplateOption?.map((item, i) => (
                    <div  key={i} style={{ marginBottom: "20px" }}>
                      <BlockStack gap="400">
                        <InlineStack align="space-between">
                          <Text as="span" variant="bodyMd">
                            {item?.name}
                          </Text>
                          <ButtonGroup>
                            <Button
                              onClick={() => {
                                handleClickView(item?.type, item.name);
                              }}
                              icon={ViewMajor}
                            >
                              View
                            </Button>
                            <Button icon={ExportMinor}>Export</Button>
                          </ButtonGroup>
                        </InlineStack>
                      </BlockStack>
                    </div>
                  ))
                )}
              </BlockStack>
            </Card>
          </BlockStack>
        </Layout.Section>
      </Layout>

      <br />
      <Card>
        <div style={{ width: "70%", minWidth: "300px" }}></div>
        <SortableDataTableDefaultProduct
          value={value}
          setValue={setValue}
          loading={loading}
          data={actionData?.products}
        />

        {/* <SortableDataTableAllProduct /> */}

        {/* <div style={{ marginBottom: "20px" }}>
          <>
            {optionTiltle !== "own" &&
              actionData?.products?.map((_: unknown, i: number) => (
                <li key={i}>{i}</li>
              ))}
          </>
        </div> */}
      </Card>
    </>
  );
}
