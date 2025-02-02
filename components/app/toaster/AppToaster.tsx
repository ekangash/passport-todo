/** 1 Node - Modules, Components, Hooks, Icons */
import React from "react";
import { Toaster as ToasterSonner } from "sonner";

/** 2 App - Components, Hooks */
import { useTheme } from "@/components/app/theme/provider/AppThemeProvider";

/** 3 Entities, Stores, Packages, Enums ... */

/**
 * @return {React.ReactElement} Сформированный DOM узел.
 */
export const AppToaster: React.FC = (): React.ReactElement => {
  const { theme } = useTheme();

  return (
    <ToasterSonner position={"bottom-center"} theme={theme === "dark" ? "dark" : "light"} expand />
  );
};
