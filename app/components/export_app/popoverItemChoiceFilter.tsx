import {
  Button,
  Popover,
  FormLayout,
  Select,
  TextField,
  Listbox,
  Icon,
} from "@shopify/polaris";
import { PaperCheckMinor } from "@shopify/polaris-icons";
import { useState, useCallback, Dispatch, useEffect } from "react";
import ChoiceListTextField from "./choiceListTextField";
import { useOutletContext } from "@remix-run/react";

interface PopOverItemChoiceFilterProps {
  value: string;
  handleSetFilter?: (type: string, val: string) => void;
  popoverActiveItem: any;
  setPopoverActiveItem: Dispatch<React.SetStateAction<{}>>;
  handleDelFilter?: (index: number) => void;
}

const PopOverItemChoiceFilter: React.FC<PopOverItemChoiceFilterProps> = ({
  value,
  handleSetFilter,
  handleDelFilter = () => {},
  popoverActiveItem,
  setPopoverActiveItem,
}) => {
  const { filters, setFilters } = useOutletContext() as any;
  const dataFilter = filters?.filter(
    (item: { field: string }) => item?.field === value,
  );

  const togglePopoverActive = () => {
    setPopoverActiveItem((prev) => {
      return {
        // ...prev,
        [value]: !popoverActiveItem?.[value],
      };
    });
  };

  useEffect(() => {
    return () => {
      setPopoverActiveItem((prev) => {
        return {
          ...prev,
          [value]: false,
        };
      });
    };
  }, []);

  return (
    <div style={{ marginBottom: "-10px", position: "relative" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Button
          variant={dataFilter?.length > 0 ? "primary" : undefined}
          size="large"
          icon={PaperCheckMinor}
          onClick={togglePopoverActive}
          disclosure
          tone={dataFilter?.length > 0 ? "success" : undefined}
        >
          {value}
        </Button>
      </div>
      {popoverActiveItem?.[value] && (
        <div
          style={{
            position: "absolute",
            top: "35px",
            left: 0,
            width: "100%",
            background: "white",
            zIndex: "9999",
            padding: "5px",
            border: "1px solid #cccc",
            borderRadius: "12px",
          }}
        >
          <ChoiceListTextField name={value} />
        </div>
      )}
    </div>
  );
};

export default PopOverItemChoiceFilter;
