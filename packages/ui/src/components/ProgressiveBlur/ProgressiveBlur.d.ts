export interface ProgressiveBlurProps {
  position?: 'top' | 'bottom' | 'left' | 'right' | 'both';
  direction?: 'top' | 'bottom' | 'left' | 'right' | 'both';
  height?: number | string;
  blurLevels?: number[];
  children?: any;
  className?: string;
  class?: string;
  attrs?: Record<string, any>;
  [key: string]: any;
}

export declare function ProgressiveBlur(props?: ProgressiveBlurProps): any;
