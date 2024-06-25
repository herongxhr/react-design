// src/components/LayerManager.tsx
import React, { FC } from "react";

interface Component {
  id: string;
  // 其他组件属性
  [key: string]: any;
}

interface LayerManagerProps {
  components: Component[];
  moveLayer: (from: number, to: number) => void;
}

const LayerManager: FC<LayerManagerProps> = ({ components, moveLayer }) => {
  const moveUp = (index: number) => {
    if (index > 0) {
      moveLayer(index, index - 1);
    }
  };

  const moveDown = (index: number) => {
    if (index < components.length - 1) {
      moveLayer(index, index + 1);
    }
  };

  return (
    <div>
      {components.map((component, index) => (
        <div
          key={component.id}
          style={{ display: "flex", alignItems: "center" }}
        >
          <span>{component.id}</span>
          <button onClick={() => moveUp(index)}>Up</button>
          <button onClick={() => moveDown(index)}>Down</button>
        </div>
      ))}
    </div>
  );
};

export default LayerManager;
