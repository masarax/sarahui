/** SarahUI Tailwind CSS Preset */
export interface SarahPreset {
  theme: {
    extend: {
      colors?: Record<string, any>;
      borderRadius?: Record<string, string>;
      boxShadow?: Record<string, string>;
      spacing?: Record<string, string>;
      animation?: Record<string, string>;
      keyframes?: Record<string, Record<string, Record<string, string>>>;
      [key: string]: any;
    };
  };
  plugins?: any[];
  [key: string]: any;
}

declare const preset: SarahPreset;
export default preset;
export { preset, preset as sarahuiPreset };
