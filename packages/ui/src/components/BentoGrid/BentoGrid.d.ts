export interface BentoGridProps {
  children?: any;
  columns?: number;
  cols?: number | null;
  className?: string;
  class?: string;
  attrs?: Record<string, any>;
  [key: string]: any;
}

export interface BentoCardProps {
  name?: string;
  title?: string;
  description?: string;
  graphic?: any;
  background?: any;
  icon?: string;
  Icon?: any;
  cta?: string;
  href?: string;
  colSpan?: number;
  rowSpan?: number;
  colStart?: number;
  rowStart?: number;
  colEnd?: number;
  rowEnd?: number;
  className?: string;
  class?: string;
  children?: any;
  attrs?: Record<string, any>;
  [key: string]: any;
}

export declare function BentoGrid(props?: BentoGridProps): any;
export declare function BentoCard(props?: BentoCardProps): any;
