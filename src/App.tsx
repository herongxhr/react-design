import React from "react";
import Canvas from "./components/Canvas";
import LayerManager from "./components/LayerManager";
import { Component } from "@/types";

const initialComponents: Component[] = [
  {
    id: "1",
    left: 100,
    top: 100,
    width: 200,
    height: 100,
    content: <div>Component 1</div>,
  },
  {
    id: "2",
    left: 200,
    top: 200,
    width: 150,
    height: 150,
    content: <div>Component 2</div>,
  },
];

const App: React.FC = () => {
  const [components, setComponents] =
    React.useState<Component[]>(initialComponents);

  const moveComponent = (id: string, left: number, top: number) => {
    setComponents(
      components.map((comp) => (comp.id === id ? { ...comp, left, top } : comp))
    );
  };

  const updateComponent = (id: string, updates: Partial<Component>) => {
    setComponents(
      components.map((comp) =>
        comp.id === id ? { ...comp, ...updates } : comp
      )
    );
  };

  const moveLayer = (from: number, to: number) => {
    const updatedComponents = [...components];
    const [movedItem] = updatedComponents.splice(from, 1);
    updatedComponents.splice(to, 0, movedItem);
    setComponents(updatedComponents);
  };

  return (
    <div style={{ display: "flex" }}>
      {/* <Canvas
        components={components}
        moveComponent={moveComponent}
        updateComponent={updateComponent}
      /> */}
      <LayerManager components={components} moveLayer={moveLayer} />
    </div>
  );
};

export default App;
