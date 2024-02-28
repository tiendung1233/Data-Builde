import { Box, Card, Text, Tabs } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { Tab } from "~/ultils/type/tabs_type";

type HeaderBarProps = {
  tabs: Tab[];
};

const HeaderBar: React.FC<HeaderBarProps> = ({ tabs }) => {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex: number) => setSelected(selectedTabIndex),
    [],
  );

  //   const tabs = [
  //     {
  //       id: "all-customers-1",
  //       content: "All",
  //       accessibilityLabel: "All customers",
  //       panelID: "all-customers-content-1",
  //       body: "",
  //     },
  //     {
  //       id: "accepts-marketing-1",
  //       content: "Accepts marketing",
  //       panelID: "accepts-marketing-content-1",
  //       body: "",
  //     },
  //     {
  //       id: "repeat-customers-1",
  //       content: "Repeat customers",
  //       panelID: "repeat-customers-content-1",
  //       body: "",
  //     },
  //     {
  //       id: "prospects-1",
  //       content: "Prospects",
  //       panelID: "prospects-content-1",
  //       body: "",
  //     },
  //   ];

  return (
    <Card>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        <br />
        <div>
          {/* <Text as="h2" variant="headingSm">
            {tabs[selected].content}
          </Text> */}
          <Box paddingBlockStart="200">{tabs[selected].body}</Box>
        </div>
      </Tabs>
    </Card>
  );
};

export default HeaderBar;
