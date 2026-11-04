export interface BorderBeamProps {
  size?: number | string;
  duration?: number | string;
  delay?: number | string;
  colorFrom?: string;
  colorTo?: string;
  reverse?: boolean;
  initialOffset?: number | string;
  borderWidth?: number | string;
  className?: string;
  class?: string;
  style?: string;
  attrs?: Record<string, any>;
  [key: string]: any;
}

export declare function BorderBeam(props?: BorderBeamProps): any;
