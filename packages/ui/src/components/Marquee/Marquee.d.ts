export interface MarqueeProps {
  children?: any;
  direction?: 'left' | 'right' | 'up' | 'down';
  reverse?: boolean;
  pauseOnHover?: boolean;
  speed?: number | string;
  duration?: number;
  vertical?: boolean;
  repeat?: number;
  gap?: number | string;
  className?: string;
  class?: string;
  attrs?: Record<string, any>;
  [key: string]: any;
}

export declare function Marquee(props?: MarqueeProps): any;
