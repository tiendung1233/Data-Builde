import { Button, Popover, ActionList } from "@shopify/polaris";
import { ExportMinor } from "@shopify/polaris-icons";
import { useState, useCallback } from "react";

interface ExportBtnProps {
  handleExport: (type: string) => void;
}

const ExportButton: React.FC<ExportBtnProps> = ({ handleExport }) => {
  const [popoverActive, setPopoverActive] = useState(true);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );

  const activator = (
    <Button
      variant="secondary"
      size="slim"
      icon={ExportMinor}
      onClick={togglePopoverActive}
      disclosure
    >
      Export
    </Button>
  );

  return (
    <div style={{ height: "250px" }}>
      <Popover
        active={popoverActive}
        activator={activator}
        autofocusTarget="first-node"
        onClose={togglePopoverActive}
      >
        <ActionList
          actionRole="menuitem"
          items={[
            {
              content: "Export CSV",
              onAction: () => {
                handleExport("csv");
              },
            },
            {
              content: "Export XLSX",
              onAction: () => {
                handleExport("xlsx");
              },
            },
          ]}
        />
      </Popover>
    </div>
  );
};

export default ExportButton;
