declare module 'tailwindcss' {
  export interface Config {
    darkMode?: string | string[];
    content?: string[];
    theme?: {
      extend?: {
        screens?: Record<string, string>;
        colors?: Record<string, any>;
        fontFamily?: Record<string, string[]>;
        borderRadius?: Record<string, string>;
        boxShadow?: Record<string, string>;
      };
    };
    plugins?: any[];
  }
} 