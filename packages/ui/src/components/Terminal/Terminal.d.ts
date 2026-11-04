export interface TerminalProps {
  children?: any;
  command?: string;
  steps?: string[];
  output?: string;
  sequence?: boolean;
  className?: string;
  class?: string;
  attrs?: Record<string, any>;
  [key: string]: any;
}

export interface AnimatedSpanProps {
  children?: any;
  className?: string;
  class?: string;
  delay?: number;
  attrs?: Record<string, any>;
  [key: string]: any;
}

export declare function Terminal(props?: TerminalProps): any;
export declare function AnimatedSpan(props?: AnimatedSpanProps): any;
