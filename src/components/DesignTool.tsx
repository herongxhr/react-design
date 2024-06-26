import React from "react";
import Toolbox from "./Toolbox";
import Canvas from "./Canvas";
import PropertiesPanel from "./PropertiesPanel";
import "@/index.css";

const DesignTool: React.FC = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Toolbox />
      <Canvas />
      <PropertiesPanel />
    </div>
  );
};

export default DesignTool;
