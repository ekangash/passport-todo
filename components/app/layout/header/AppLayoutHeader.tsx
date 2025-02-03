/** 1 Node - Modules, Components, Hooks, Icons */
import React from "react";

/** 2 App - Components, Hooks */
import { AppLayoutLogo } from "@/components/app/layout/logo/AppLayoutLogo";
import { AppThemeToggle } from "@/components/app/theme/toggle/AppThemeToggle";

/** 3 Entities, Stores, Packages, Enums ... */
import { cn } from "@/packages/utils";
import { AppLayoutHeaderPassport } from "@/components/app/layout/header/passport/AppLayoutHeaderPassport";

interface AppLayoutHeaderProps {
  className?: string;
}

/**
 * @return {React.ReactElement} Сформированный DOM узел.
 */
export const AppLayoutHeader: React.FC<AppLayoutHeaderProps> = ({
  className = "",
}): React.ReactElement => {
  return (
    <header className={cn("flex items-center justify-between gap-1", className)}>
      <AppLayoutLogo />
      <div className="flex items-center space-x-1.5">
        <AppLayoutHeaderPassport />
        <AppThemeToggle />
      </div>
    </header>
  );
};
