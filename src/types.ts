export interface Component {
  id: string;
  left: number;
  top: number;
  width: number;
  height: number;
  content: React.ReactNode;
  [key: string]: any;
}

export type ToolType = 'Line' | 'Rectangle' | 'Circle' | 'Text' | 'Image' | 'Icon' | 'Button' | 'None';

export interface Component {
  id: string;
  type: ToolType;
  left: number;
  top: number;
  width: number;
  height: number;
  content: React.ReactNode;
}
