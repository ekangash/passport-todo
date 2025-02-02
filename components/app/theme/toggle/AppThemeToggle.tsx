/** 1 Node - Modules, Components, Hooks, Icons */
import React from "react";
import { Moon, Sunset } from "lucide-react";

/** 2 App - Components, Hooks */
import { useTheme } from "@/components/app/theme/provider/AppThemeProvider";
import { Button } from "@/components/shared/button/Button";
import { Icon } from "@/components/shared/icon/Icon";

/** 3 Entities, Stores, Packages, Enums ... */

/**
 * @return {React.ReactElement} Сформированный DOM узел.
 */
export const AppThemeToggle: React.FC = (): React.ReactElement => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      onClick={(): void => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
      size="square"
      variant="secondary"
    >
      <Icon
        className="fill-violet-700 text-violet-700 block dark:hidden"
        path={Moon}
        color="none"
      />
      <Icon className="fill-yellow-500 hidden dark:block" path={Sunset} color="none" />
    </Button>
  );
};
