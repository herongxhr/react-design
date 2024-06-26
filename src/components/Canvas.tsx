import React from "react";
import Toolbox from "./Toolbox";
import PropertiesPanel from "./PropertiesPanel";

interface CanvasProps {
  width: string;
  height: string;
  toolboxWidth: string;
  propertiesPanelWidth: string;
}

const Canvas: React.FC<CanvasProps> = ({
  width,
  height,
  toolboxWidth,
  propertiesPanelWidth,
}) => {
  return (
    <div
      className="relative bg-white"
      style={{ width, height, margin: "0 auto" }}
    >
      <h3>Canvas</h3>
      <Toolbox width={toolboxWidth} />
      <PropertiesPanel width={propertiesPanelWidth} />
    </div>
  );
};

export default Canvas;
