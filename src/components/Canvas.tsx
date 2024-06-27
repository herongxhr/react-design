import React from "react";
import { useDrop } from "react-dnd";
import { ToolType, Component } from "@/types";
import DraggableComponent from "./DraggableComponent";

interface CanvasProps {
  selectedToolType: ToolType;
  components: Component[];
  onAddComponent: (component: Component) => void;
  onUpdateComponent: (id: string, updates: Partial<Component>) => void;
}

const Canvas: React.FC<CanvasProps> = ({
  selectedToolType,
  components,
  onAddComponent,
  onUpdateComponent,
}) => {
  const [, drop] = useDrop(() => ({
    accept: "COMPONENT",
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);
      onUpdateComponent(item.id, { left, top });
      return undefined;
    },
  }));

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (selectedToolType !== "None") {
      const newComponent: Component = {
        id: `${Date.now()}`,
        type: selectedToolType,
        left: e.nativeEvent.offsetX,
        top: e.nativeEvent.offsetY,
        width: 100,
        height: 100,
        content: <div>{selectedToolType}</div>,
      };
      onAddComponent(newComponent);
    }
  };

  return (
    <div
      ref={drop}
      className="w-full h-full bg-[#f0f0f0]"
      onClick={handleCanvasClick}
    >
      {components.map((component) => (
        <DraggableComponent
          key={component.id}
          component={component}
          onUpdateComponent={onUpdateComponent}
        />
      ))}
    </div>
  );
};

export default Canvas;
