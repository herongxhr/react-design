import React from "react";
import DesignTool from "@/components/DesignTool";

const App: React.FC = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <DesignTool
        toolPanelWidth="60px"
        width="800px"
        height="600px"
        propertiesPanelWidth="200px"
      />
    </div>
  );
};

export default App;
