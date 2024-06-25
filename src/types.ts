export interface Component {
  id: string;
  left: number;
  top: number;
  width: number;
  height: number;
  content: React.ReactNode;
  [key: string]: any;
}
