export interface PointerProps {
  name?: string;
  color?: string;
  cursor?: any;
  children?: any;
  content?: any;
  className?: string;
  class?: string;
  attrs?: Record<string, any>;
  [key: string]: any;
}

export declare function Pointer(props?: PointerProps): any;
