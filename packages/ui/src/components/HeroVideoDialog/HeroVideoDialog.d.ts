export interface HeroVideoDialogProps {
  videoSrc?: string;
  thumbnailSrc?: string;
  thumbnailAlt?: string;
  animationStyle?: 'from-center' | 'from-bottom' | 'from-top' | 'from-left' | 'from-right' | 'fade' | 'top-in-bottom-out' | 'left-in-right-out';
  className?: string;
  class?: string;
  attrs?: Record<string, any>;
  [key: string]: any;
}

export declare function HeroVideoDialog(props?: HeroVideoDialogProps): any;
