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
        toolPanelWidth="60"
        width="800"
        height="600"
        propertiesPanelWidth="200"
      />
    </div>
  );
};

export default App;
