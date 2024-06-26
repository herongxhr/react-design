import React from "react";
import ToolProperties from "./ToolProperties";
import LayerManager from "./LayerManager";

const PropertiesPanel: React.FC = () => {
  return (
    <div style={{ width: "300px", padding: "10px" }}>
      <h3>Properties Panel</h3>
      <div style={{ borderBottom: "1px solid #ccc" }}>
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
