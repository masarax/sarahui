export interface DockItem {
  icon?: string;
  label?: string;
  bg?: string;
  className?: string;
  separator?: boolean;
  [key: string]: any;
}

export interface DockProps {
  direction?: 'bottom' | 'top' | 'vertical';
  iconSize?: number;
  iconMagnification?: number;
  iconDistance?: number;
  items?: DockItem[];
  children?: any;
  className?: string;
  class?: string;
  attrs?: Record<string, any>;
  [key: string]: any;
}

export declare function Dock(props?: DockProps): any;
