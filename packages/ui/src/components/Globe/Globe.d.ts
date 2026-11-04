export interface GlobeProps {
  size?: number | string;
  className?: string;
  class?: string;
  config?: Record<string, any>;
  attrs?: Record<string, any>;
  [key: string]: any;
}

export declare function Globe(props?: GlobeProps): any;
