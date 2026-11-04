export interface LensProps {
  children?: any;
  zoomFactor?: number | string;
  zoom?: number | string;
  lensSize?: number;
  isStatic?: boolean;
  position?: { x: number; y: number };
  defaultPosition?: { x: number; y: number };
  duration?: number;
  lensColor?: string;
  ariaLabel?: string;
  className?: string;
  class?: string;
  attrs?: Record<string, any>;
  [key: string]: any;
}

export declare function Lens(props?: LensProps): any;
