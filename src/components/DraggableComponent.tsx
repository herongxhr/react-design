import React, { useRef, FC } from "react";
import Moveable from "react-moveable";
import { useDrag } from "react-dnd";

interface Component {
  id: string;
  left: number;
  top: number;
  width: number;
  height: number;
  content: React.ReactNode;
  // 其他组件属性
  [key: string]: any;
}

interface DraggableComponentProps {
  component: Component;
  updateComponent: (id: string, updates: Partial<Component>) => void;
}

const DraggableComponent: FC<DraggableComponentProps> = ({
  component,
  updateComponent,
}) => {
  const ref = useRef<HTMLDivElement>(null);
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
        rotatable
        onDrag={({ left, top }) => updateComponent(component.id, { left, top })}
        onResize={({ width, height }) =>
          updateComponent(component.id, { width, height })
        }
        onRotate={({ beforeRotate }) =>
          updateComponent(component.id, { rotate: beforeRotate })
        }
      />
    </div>
  );
};

export default DraggableComponent;
