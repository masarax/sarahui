export interface AnimatedListProps {
  items?: any[];
  children?: any;
  delay?: number;
  className?: string;
  class?: string;
  attrs?: Record<string, any>;
  [key: string]: any;
}

export declare function AnimatedList(props?: AnimatedListProps): any;
