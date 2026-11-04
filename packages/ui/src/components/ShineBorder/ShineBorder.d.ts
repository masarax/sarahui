export interface ShineBorderProps {
  children?: any;
  borderWidth?: number;
  duration?: number;
  color?: string | string[];
  shineColor?: string | string[];
  className?: string;
  class?: string;
  attrs?: Record<string, any>;
  [key: string]: any;
}

export declare function ShineBorder(props?: ShineBorderProps): any;
