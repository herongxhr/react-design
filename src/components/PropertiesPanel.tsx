import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ToolProperties from "./ToolProperties";
import LayerManager from "./LayerManager";

interface PropertiesPanelProps {
  width?: number;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = () => {
  return (
    <div
      id="properties-panel"
      className="w-full h-full flex-auto bg-gray-800 p-2 z-10"
    >
      <Tabs>
        <TabList>
          <Tab>属性</Tab>
          <Tab>图层</Tab>
        </TabList>
        <TabPanel>
          <h4 className="border-b border-gray-300 mb-2">Tool Properties</h4>
          <ToolProperties />
        </TabPanel>
        <TabPanel>
          <h4 className="border-b border-gray-300 mb-2">Layer Manager</h4>
          <LayerManager />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default PropertiesPanel;
