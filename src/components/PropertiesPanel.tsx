import React from "react";
import ToolProperties from "./ToolProperties";
import LayerManager from "./LayerManager";

interface PropertiesPanelProps {
  width?: string;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  width = "120px",
}) => {
  return (
    <div
      id="properties-panel"
      className="bg-gray-200 p-4 z-10"
      style={{ width, position: "absolute", right: 0, top: 0, bottom: 0 }}
    >
      <h3>Properties Panel</h3>
      <div className="border-b border-gray-300">
        <h4>Tool Properties</h4>
        <ToolProperties />
      </div>
      <div>
        <h4>Layer Manager</h4>
        <LayerManager />
      </div>
    </div>
  );
};

export default PropertiesPanel;
