export interface MagicCardProps {
  children?: any;
  className?: string;
  class?: string;
  mode?: 'gradient' | 'orb';
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
  gradientFrom?: string;
  gradientTo?: string;
  glowFrom?: string;
  glowTo?: string;
  glowAngle?: number;
  glowSize?: number;
  glowBlur?: number;
  glowOpacity?: number;
  style?: string;
  attrs?: Record<string, any>;
  [key: string]: any;
}

export declare function MagicCard(props?: MagicCardProps): any;
