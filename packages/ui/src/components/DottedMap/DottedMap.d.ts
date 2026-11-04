export interface MapMarker {
  lat: number;
  lng: number;
  label?: string;
  size?: number;
  color?: string;
  pulse?: boolean;
}

export interface DottedMapProps {
  width?: number;
  height?: number;
  dotRadius?: number;
  dotSize?: number;
  dotColor?: string;
  markerColor?: string;
  markers?: MapMarker[];
  points?: MapMarker[];
  lines?: any[];
  routes?: any[];
  connections?: any[];
  glow?: boolean;
  className?: string;
  class?: string;
  attrs?: Record<string, any>;
  [key: string]: any;
}

export declare function DottedMap(props?: DottedMapProps): any;
