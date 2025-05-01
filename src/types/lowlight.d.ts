declare module "lowlight" {
  export const common: Record<string, any>;
  export function createLowlight(grammars: Record<string, any>): {
    register: (name: string, language: any) => void;
  };
}
