import React, { useState, useCallback, useRef } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Canvas from "@/components/Canvas";
import Toolbox from "@/components/ToolPanel";
import PropertiesPanel from "@/components/PropertiesPanel";
import { ToolType, Component } from "@/types";
import "@/index.css";

interface DesignToolProps {
  width: string;
  height: string;
  toolPanelWidth: string;
  propertiesPanelWidth: string;
}

const DesignTool: React.FC<DesignToolProps> = ({
  width,
  height,
  toolPanelWidth,
  propertiesPanelWidth,
}) => {
  const [selectedToolType, setSelectedToolType] = useState<ToolType>("None");
  const [components, setComponents] = useState<Component[]>([]);
  const [toolboxPosition, setToolboxPosition] = useState({
    x: 0,
    y: 0,
    locked: true,
  });
  const [propertiesPanelPosition, setPropertiesPanelPosition] = useState({
    x: 0,
    y: 0,
    locked: true,
  });

  const initialMousePosition = useRef({ x: 0, y: 0 });
  const initialToolboxPosition = useRef({ x: 0, y: 0 });
  const initialPropertiesPanelPosition = useRef({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleSelectTool = useCallback(() => {
    (toolType: ToolType) => {
      setSelectedToolType(toolType);
    };
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

  const convertToWindowPosition = (
    canvasRect: DOMRect,
    position: { x: number; y: number }
  ) => {
    return {
      x: canvasRect.left + position.x,
      y: canvasRect.top + position.y,
    };
  };
  const handleToolboxDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    initialMousePosition.current = { x: e.clientX, y: e.clientY };
    initialToolboxPosition.current = {
      x: toolboxPosition.x,
      y: toolboxPosition.y,
    };
    const canvasRect = canvasRef.current!.getBoundingClientRect();
    const windowPosition = convertToWindowPosition(
      canvasRect,
      initialToolboxPosition.current
    );
    setToolboxPosition({ ...windowPosition, locked: false });
  };

  const handleToolboxDrag = (e: MouseEvent) => {
    const deltaX = e.clientX - initialMousePosition.current.x;
    const deltaY = e.clientY - initialMousePosition.current.y;
    setToolboxPosition({
      x: initialToolboxPosition.current.x + deltaX,
      y: initialToolboxPosition.current.y + deltaY,
      locked: false,
    });
  };

  const handlePropertiesPanelDragStart = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    initialMousePosition.current = { x: e.clientX, y: e.clientY };
    initialPropertiesPanelPosition.current = {
      x: propertiesPanelPosition.x,
      y: propertiesPanelPosition.y,
    };
    const canvasRect = canvasRef.current!.getBoundingClientRect();
    const windowPosition = convertToWindowPosition(
      canvasRect,
      initialPropertiesPanelPosition.current
    );
    setPropertiesPanelPosition({ ...windowPosition, locked: false });
  };

  const handlePropertiesPanelDrag = (e: MouseEvent) => {
    const deltaX = e.clientX - initialMousePosition.current.x;
    const deltaY = e.clientY - initialMousePosition.current.y;
    setPropertiesPanelPosition({
      x: initialPropertiesPanelPosition.current.x + deltaX,
      y: initialPropertiesPanelPosition.current.y + deltaY,
      locked: false,
    });
  };

  const handleMouseUp = () => {
    setToolboxPosition((prev) => ({ ...prev, locked: true }));
    setPropertiesPanelPosition((prev) => ({ ...prev, locked: true }));
    window.removeEventListener("mousemove", handleToolboxDrag);
    window.removeEventListener("mousemove", handlePropertiesPanelDrag);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDown =
    (
      dragStartHandler: (e: React.MouseEvent<HTMLDivElement>) => void,
      dragHandler: (e: MouseEvent) => void
    ) =>
    (e: React.MouseEvent<HTMLDivElement>) => {
      dragStartHandler(e);
      window.addEventListener("mousemove", dragHandler);
      window.addEventListener("mouseup", handleMouseUp);
    };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="relative" style={{ width, height }}>
        <div
          ref={canvasRef}
          className="relative"
          style={{
            width,
            height,
          }}
        >
          <Canvas
            width={width}
            height={height}
            components={components}
            selectedToolType={selectedToolType}
            onAddComponent={handleAddComponent}
            onUpdateComponent={handleUpdateComponent}
          />
        </div>
        <div
          className="absolute flex flex-col"
          style={{
            width: toolPanelWidth,
            height: height,
            top: toolboxPosition.y,
            left: toolboxPosition.locked
              ? -parseInt(toolPanelWidth)
              : toolboxPosition.x,
            position: toolboxPosition.locked ? "absolute" : "fixed",
          }}
        >
          <div
            className="drag-handle w-full bg-gray-800 text-white text-sm p-2 cursor-move"
            onMouseDown={handleMouseDown(
              handleToolboxDragStart,
              handleToolboxDrag
            )}
          >
            <div className="w-full text-center"> 工具</div>
          </div>
          <Toolbox onSelectTool={handleSelectTool} width={toolPanelWidth} />
        </div>
        <div
          className="absolute flex flex-col"
          style={{
            width: propertiesPanelWidth,
            height: height,
            top: propertiesPanelPosition.y,
            right: propertiesPanelPosition.locked
              ? -parseInt(propertiesPanelWidth)
              : propertiesPanelPosition.x,
            position: propertiesPanelPosition.locked ? "absolute" : "fixed",
          }}
        >
          <div
            className="drag-handle bg-gray-800 w-full text-sm text-white p-2 cursor-move"
            onMouseDown={handleMouseDown(
              handlePropertiesPanelDragStart,
              handlePropertiesPanelDrag
            )}
          >
            <div className="w-full text-center">调整区</div>
          </div>
          <PropertiesPanel width={propertiesPanelWidth} />
        </div>
      </div>
    </DndProvider>
  );
};

export default DesignTool;
