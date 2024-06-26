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
import "@/index.css";

interface ToolboxProps {
  width?: string;
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

const Toolbox: React.FC<ToolboxProps> = ({ width = "80px" }) => {
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
    } else {
      setSelectedItem(itemId);
    }
  };

  return (
    <div
      id="toolbox"
      className="bg-gray-800 p-2 z-10 overflow-y-auto text-white relative"
      style={{
        width,
        position: "absolute",
        left: 0,
        transform: "translateX(-100%)",
        top: 0,
        bottom: 0,
      }}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-full text-center text-base mb-2">工具</div>
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
