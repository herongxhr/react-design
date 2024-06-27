import React, { useState } from "react";
import {
  MdCropSquare,
  MdRadioButtonUnchecked,
  MdTextFields,
  MdInsertPhoto,
  MdInsertEmoticon,
  MdTouchApp,
  MdLineWeight,
} from "react-icons/md";
import { ToolType } from "@/types";
import "@/index.css";

interface ToolboxProps {
  onSelectTool: (tool: ToolType) => void;
}

const iconClassName =
  "w-8 h-8 transition-transform transform duration-300 ease-in-out";

const icons = [
  {
    id: "Line",
    desc: "直线",
    icon: <MdLineWeight className={iconClassName} />,
  },
  {
    id: "Rectangle",
    desc: "矩形",
    icon: <MdCropSquare className={iconClassName} />,
  },
  {
    id: "Circle",
    desc: "圆形",
    icon: <MdRadioButtonUnchecked className={iconClassName} />,
  },
  {
    id: "Text",
    desc: "文本",
    icon: <MdTextFields className={iconClassName} />,
  },
  {
    id: "Image",
    desc: "图片",
    icon: <MdInsertPhoto className={iconClassName} />,
  },
  {
    id: "Icon",
    desc: "图标",
    icon: <MdInsertEmoticon className={iconClassName} />,
  },
  {
    id: "Button",
    desc: "按钮",
    icon: <MdTouchApp className={iconClassName} />,
  },
];

const Toolbox: React.FC<ToolboxProps> = ({ onSelectTool }) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget as HTMLElement;
    const itemId = target.getAttribute("data-item");
    if (itemId && itemId !== hoveredItem) {
      setHoveredItem(itemId);
    }
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleClick = (itemId: string) => {
    if (selectedItem === itemId) {
      setSelectedItem(null);
      onSelectTool("None");
    } else {
      setSelectedItem(itemId);
      onSelectTool(itemId as ToolType);
    }
  };

  return (
    <div
      id="toolbox"
      className="w-full h-full flex-auto bg-gray-800 p-2 z-10 overflow-y-auto text-white relative"
      onMouseLeave={handleMouseLeave}
    >
      {icons.map(({ id, desc, icon }) => (
        <div
          key={id}
          className={`flex items-center mb-2 relative cursor-pointer p-2 rounded ${
            id === hoveredItem ? "bg-gray-700" : ""
          } ${id === selectedItem ? "bg-blue-600 text-white" : ""}`}
          data-item={id}
          title={desc}
          onMouseOver={handleMouseOver}
          onClick={() => handleClick(id)}
        >
          {icon}
        </div>
      ))}
    </div>
  );
};

export default Toolbox;
