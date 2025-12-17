import { ThemeMode } from "@/lib/integration/mui";

interface ControllThemeProvidedValue {
  changeMode: () => void;
  mode: ThemeMode;
}

export type { ControllThemeProvidedValue };
