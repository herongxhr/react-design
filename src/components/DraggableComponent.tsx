import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { Component } from "@/types";
import Moveable from "react-moveable";

interface DraggableComponentProps {
  component: Component;
  onUpdateComponent: (id: string, updates: Partial<Component>) => void;
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({
  component,
  onUpdateComponent,
}) => {
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "COMPONENT",
    item: { id: component.id, left: component.left, top: component.top },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        left: component.left,
        top: component.top,
        width: component.width,
        height: component.height,
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <div ref={drag} style={{ width: "100%", height: "100%" }}>
        {component.content}
      </div>
      <Moveable
        target={ref.current}
        draggable
        resizable
        onDrag={({ left, top }) =>
          onUpdateComponent(component.id, { left, top })
        }
        onResize={({ width, height }) =>
          onUpdateComponent(component.id, { width, height })
        }
      />
    </div>
  );
};

export default DraggableComponent;
