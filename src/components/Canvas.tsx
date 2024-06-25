import React, { FC } from "react";
import { useDrop, DropTargetMonitor } from "react-dnd";
import DraggableComponent from "./DraggableComponent";
import { Component } from "@/types";

interface CanvasProps {
  components: Component[];
  moveComponent: (id: string, left: number, top: number) => void;
  updateComponent: (id: string, updates: Partial<Component>) => void;
}

const Canvas: FC<CanvasProps> = ({
  components,
  moveComponent,
  updateComponent,
}) => {
  const [, drop] = useDrop(() => ({
    accept: "COMPONENT",
    drop: (item: Component, monitor: DropTargetMonitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (delta) {
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveComponent(item.id, left, top);
      }
      return undefined;
    },
  }));

  return (
    <div
      ref={drop}
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      {components.map((component) => (
        <DraggableComponent
          key={component.id}
          component={component}
          updateComponent={updateComponent}
        />
      ))}
    </div>
  );
};

export default Canvas;
