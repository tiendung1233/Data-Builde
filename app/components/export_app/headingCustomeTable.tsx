import {
  Button,
  Popover,
  FormLayout,
  Select,
  TextField,
} from "@shopify/polaris";
import { useState, useCallback, Dispatch } from "react";

interface HeadingCustomTableProps {
  value: string;
  handleChangeHeading: (type: string, val: string) => void;
  type: string;
  popoverActive: any;
  setPopoverActive: Dispatch<React.SetStateAction<any>>;
  handleDelHeading?: (index: number) => void;
  index?: number;
}

const HeadingCustomTable: React.FC<HeadingCustomTableProps> = ({
  value,
  handleChangeHeading,
  type,
  handleDelHeading = () => {},
  index = 0,
  popoverActive,
  setPopoverActive,
}) => {
  // const [popoverActive, setPopoverActive] = useState(false);
  const [tagValue, setTagValue] = useState("");
  const [showInitialValue, setShowInitialValue] = useState(true);

  const togglePopoverActive = () => {
    setPopoverActive((popoverActive: any) => {
      return {
        ...popoverActive,
        [type]: !popoverActive[type],
      };
    });
  };

  function truncateString(str: string, maxLength: number): string {
    if (str.length <= maxLength) {
      return str;
    } else {
      return str.substring(0, maxLength) + "...";
    }
  }

  const handleTagValueChange = (value: string) => {
    setShowInitialValue(false);
    setTagValue(value);
  };
  const activator = (
    <Button onClick={togglePopoverActive} disclosure>
      {truncateString(value, 10)}
    </Button>
  );

  return (
    <div style={{ height: "50" }}>
      <Popover
        active={popoverActive[type]}
        activator={activator}
        onClose={togglePopoverActive}
        ariaHaspopup={false}
        sectioned
      >
        <FormLayout>
          {/* <Select label="Show all customers where:" options={["Tagged with"]} /> */}
          <TextField
            label="Rename"
            value={showInitialValue ? value : tagValue}
            onChange={handleTagValueChange}
            autoComplete="off"
          />
          <Button
            variant="primary"
            onClick={() => {
              handleChangeHeading(type, showInitialValue ? value : tagValue);
            }}
            size="slim"
          >
            Rename
          </Button>
          <Button
            onClick={() => {
              handleDelHeading(index);
            }}
            variant="primary"
            tone="critical"
          >
            Delete Column
          </Button>
        </FormLayout>
      </Popover>
    </div>
  );
};

export default HeadingCustomTable;
