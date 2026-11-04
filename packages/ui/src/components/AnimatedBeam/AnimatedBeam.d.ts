export interface AnimatedBeamProps {
  duration?: number;
  delay?: number;
  curvature?: number;
  reverse?: boolean;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  startX?: number;
  startY?: number;
  endX?: number;
  endY?: number;
  d?: string;
  className?: string;
  class?: string;
  attrs?: Record<string, any>;
  [key: string]: any;
}

export declare function AnimatedBeam(props?: AnimatedBeamProps): any;
