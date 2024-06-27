import React, { useState, useCallback, useRef, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Canvas from "@/components/Canvas";
import ToolPanel from "@/components/ToolPanel";
import PropertiesPanel from "@/components/PropertiesPanel";
import { ToolType, Component } from "@/types";
import "@/index.css";

interface DesignToolProps {
  width: number;
  height: number;
  toolPanelWidth: number;
  propertiesPanelWidth: number;
}

const SNAP_DISTANCE = 30;

const DesignTool: React.FC<DesignToolProps> = ({
  width,
  height,
  toolPanelWidth,
  propertiesPanelWidth,
}) => {
  const [selectedToolType, setSelectedToolType] = useState<ToolType>("None");
  const [components, setComponents] = useState<Component[]>([]);

  const [toolPanelPosition, setToolPanelPosition] = useState({
    x: -toolPanelWidth,
    y: 0,
  });
  const [propertiesPanelPosition, setPropertiesPanelPosition] = useState({
    x: window.innerWidth,
    y: 0,
  });

  const initialMousePosition = useRef({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);
  const mouseMoveHandlerRef = useRef<((e: MouseEvent) => void) | null>(null);
  const mouseUpHandlerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const updatePanelPositions = () => {
      const canvasRect = canvasRef.current!.getBoundingClientRect();
      setToolPanelPosition({
        x: canvasRect.left - toolPanelWidth,
        y: canvasRect.top,
      });
      setPropertiesPanelPosition({
        x: canvasRect.right,
        y: canvasRect.top,
      });
    };

    updatePanelPositions();
    window.addEventListener("resize", updatePanelPositions);

    return () => {
      window.removeEventListener("resize", updatePanelPositions);
    };
  }, [canvasRef, toolPanelWidth, propertiesPanelWidth]);

  const handleSelectTool = useCallback((toolType: ToolType) => {
    setSelectedToolType(toolType);
  }, []);

  const handleAddComponent = useCallback((component: Component) => {
    setComponents((prevComponents) => [...prevComponents, component]);
  }, []);

  const handleUpdateComponent = useCallback(
    (id: string, updates: Partial<Component>) => {
      setComponents((prevComponents) =>
        prevComponents.map((comp) =>
          comp.id === id ? { ...comp, ...updates } : comp
        )
      );
    },
    []
  );

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    initialMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleDrag = (
    e: MouseEvent,
    position: { x: number; y: number },
    setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>
  ) => {
    const deltaX = e.clientX - initialMousePosition.current.x;
    const deltaY = e.clientY - initialMousePosition.current.y;
    setPosition((prev) => ({
      ...prev,
      x: position.x + deltaX,
      y: position.y + deltaY,
    }));
  };

  const handleToolPanelDrag = (
    e: MouseEvent,
    position: { x: number; y: number },
    setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>
  ) => {
    handleDrag(e, position, setPosition);
  };

  const handlePropertiesPanelDrag = (
    e: MouseEvent,
    position: { x: number; y: number },
    setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>
  ) => {
    handleDrag(e, position, setPosition);
  };

  const handleMouseUp = () => {
    const canvasRect = canvasRef.current!.getBoundingClientRect();
    setToolPanelPosition((prev) => {
      if (
        Math.abs(prev.x - canvasRect.left) < SNAP_DISTANCE + toolPanelWidth &&
        Math.abs(prev.y - canvasRect.top) < SNAP_DISTANCE
      ) {
        return {
          ...prev,
          x: canvasRect.left - toolPanelWidth,
          y: canvasRect.top,
        };
      } else {
        return prev;
      }
    });
    setPropertiesPanelPosition((prev) => {
      if (
        Math.abs(prev.x - canvasRect.right) < SNAP_DISTANCE &&
        Math.abs(prev.y - canvasRect.top) < SNAP_DISTANCE
      ) {
        return {
          ...prev,
          x: canvasRect.right,
          y: canvasRect.top,
        };
      } else {
        return prev;
      }
    });
    window.removeEventListener("mousemove", mouseMoveHandlerRef.current!);
    window.removeEventListener("mouseup", mouseUpHandlerRef.current!);
    initialMousePosition.current = { x: 0, y: 0 };
  };

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    position: { x: number; y: number },
    dragStartHandler: (
      e: React.MouseEvent<HTMLDivElement>,
      setPosition: React.Dispatch<
        React.SetStateAction<{ x: number; y: number }>
      >
    ) => void,
    setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>,
    dragHandler: (
      e: MouseEvent,
      position: { x: number; y: number },
      setPosition: React.Dispatch<
        React.SetStateAction<{ x: number; y: number }>
      >
    ) => void
  ) => {
    dragStartHandler(e, setPosition);
    mouseMoveHandlerRef.current = (event) =>
      dragHandler(event, position, setPosition);
    mouseUpHandlerRef.current = handleMouseUp;
    window.addEventListener("mousemove", mouseMoveHandlerRef.current);
    window.addEventListener("mouseup", mouseUpHandlerRef.current);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ width: width + "px", height: height + "px" }}>
        <div ref={canvasRef} className="w-full h-full">
          <Canvas
            components={components}
            selectedToolType={selectedToolType}
            onAddComponent={handleAddComponent}
            onUpdateComponent={handleUpdateComponent}
          />
        </div>
        <div
          className="flex flex-col"
          style={{
            width: toolPanelWidth + "px",
            position: "fixed",
            height: height + "px",
            top: toolPanelPosition.y,
            left: toolPanelPosition.x,
          }}
        >
          <div
            className="drag-handle bg-gray-800 text-white p-2 cursor-move"
            onMouseDown={(e) =>
              handleMouseDown(
                e,
                toolPanelPosition,
                handleDragStart,
                setToolPanelPosition,
                handleToolPanelDrag
              )
            }
          >
            <div className="w-full text-center">工具</div>
          </div>
          <ToolPanel onSelectTool={handleSelectTool} />
        </div>
        <div
          className="flex flex-col"
          style={{
            position: "fixed",
            width: propertiesPanelWidth + "px",
            height: height + "px",
            top: propertiesPanelPosition.y,
            left: propertiesPanelPosition.x,
          }}
        >
          <div
            className="drag-handle bg-gray-800 text-white p-2 cursor-move"
            onMouseDown={(e) =>
              handleMouseDown(
                e,
                propertiesPanelPosition,
                handleDragStart,
                setPropertiesPanelPosition,
                handlePropertiesPanelDrag
              )
            }
          >
            <div className="w-full text-center">调整区</div>
          </div>
          <PropertiesPanel />
        </div>
      </div>
    </DndProvider>
  );
};

export default DesignTool;
