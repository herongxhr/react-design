import React from "react";
import Canvas from "./Canvas";
import "@/index.css";

interface DesignToolProps {
  width: string;
  height: string;
  toolboxWidth: string;
  propertiesPanelWidth: string;
}

const DesignTool: React.FC<DesignToolProps> = ({
  width,
  height,
  toolboxWidth,
  propertiesPanelWidth,
}) => {
  return (
    <Canvas
      width={width}
      height={height}
      toolboxWidth={toolboxWidth}
      propertiesPanelWidth={propertiesPanelWidth}
    />
  );
};

export default DesignTool;
