/** 1 Node - Modules, Components, Hooks, Icons */
import { createContext, useContext, useEffect, useState, Context } from "react";

/** 2 App - Components, Hooks */
/** 3 Entities, Stores, Packages, Enums ... */

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext: Context<ThemeProviderState> =
  createContext<ThemeProviderState>(initialState);

/**
 * @return {React.ReactElement} Сформированный DOM узел.
 */
export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect((): void => {
    const root: HTMLElement = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme: string = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);

      return;
    }

    root.classList.add(theme);
  }, [theme]);

  return (
    <ThemeProviderContext.Provider
      {...props}
      value={{
        theme,
        setTheme: (theme: Theme) => {
          localStorage.setItem(storageKey, theme);
          setTheme(theme);
        },
      }}
    >
      {children}
    </ThemeProviderContext.Provider>
  );
}

/**
 * Хук контекста темы.
 *
 * @return {ThemeProviderState} Состояние провайдера темы.
 */
export const useTheme = (): ThemeProviderState => {
  const context: ThemeProviderState = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
