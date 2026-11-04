export interface GlareHoverProps {
  children?: any;
  color?: string;
  opacity?: number;
  background?: string;
  angle?: number;
  size?: number;
  duration?: number;
  playOnce?: boolean;
  width?: number | string;
  height?: number | string;
  className?: string;
  class?: string;
  attrs?: Record<string, any>;
  [key: string]: any;
}

export declare function GlareHover(props?: GlareHoverProps): any;
