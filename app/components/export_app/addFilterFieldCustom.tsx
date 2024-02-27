import {
  Button,
  Popover,
  FormLayout,
  Select,
  TextField,
  Listbox,
  OptionList,
  Icon,
} from "@shopify/polaris";
import { useState, useCallback, Dispatch } from "react";
import PopOverItemChoiceFilter from "./popoverItemChoiceFilter";

interface AddFilterFieldCustomProps {
  value?: string;
  handleSetFilter: (type: string, val: string) => void;
  data: any;
  popoverActive: boolean;
  setPopoverActive: Dispatch<React.SetStateAction<boolean>>;
  handleDelFilter?: (index: number) => void;
}

const AddFilterFieldCustom: React.FC<AddFilterFieldCustomProps> = ({
  value,
  handleSetFilter,
  data,
  handleDelFilter = () => {},
  popoverActive,
  setPopoverActive,
}) => {
  const itemList = Object.keys(data);
  const newObjectPopOverItem = Object.fromEntries(
    Object.keys(data).map((key) => [key, false]),
  );

  const options = Object.entries(data).map(([value, label], index) => ({
    value,
    label,
  }));
  const [popoverActiveItem, setPopOverActiveItem] =
    useState<any>(newObjectPopOverItem);
  const [selected, setSelected] = useState<string[]>([]);

  const togglePopoverActive = useCallback(() => {
    setPopoverActive((prev) => !prev);
  }, []);

  const activator = (
    <Button onClick={togglePopoverActive} disclosure>
      Add filter
    </Button>
  );

  return (
    <div style={{ height: "50" }}>
      <Popover
        active={popoverActive}
        activator={activator}
        onClose={togglePopoverActive}
        ariaHaspopup={false}
        sectioned
      >
        <div style={{ width: "100%", minWidth: "350px" }}>
          <Listbox accessibilityLabel="Basic Listbox example">
            {data &&
              itemList?.map((item, i: number) => (
                <div key={i}>
                  <PopOverItemChoiceFilter
                    value={item}
                    popoverActiveItem={
                      popoverActiveItem || newObjectPopOverItem
                    }
                    setPopoverActiveItem={setPopOverActiveItem}
                  />
                  <br />
                </div>
              ))}
          </Listbox>
        </div>
      </Popover>
    </div>
  );
};

export default AddFilterFieldCustom;
