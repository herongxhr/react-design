import React from "react";

const Toolbox: React.FC = () => {
  return (
    <div
      style={{ width: "200px", borderRight: "1px solid #ccc", padding: "10px" }}
    >
      <h3>Toolbox</h3>
      <div>Rectangle</div>
      <div>Circle</div>
      <div>Text</div>
      <div>Button</div>
      <div>Image</div>
      <div>Icon</div>
      <div>Line</div>
    </div>
  );
};

export default Toolbox;
