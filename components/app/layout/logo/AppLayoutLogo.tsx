/** 1 Node - Modules, Components, Hooks, Icons */
import React, { useCallback } from "react";

/** 2 App - Components, Hooks */
import { Button } from "@/components/shared/button/Button";
import { useScrollToAnchor } from "@/hooks/useScrollToAnchor";

/** 3 Entities, Stores, Packages, Enums ... */

interface AppLayoutLogoProps {
  badge?: string;
}

/**
 * @return {React.ReactElement} Сформированный DOM узел.
 */
export const AppLayoutLogo: React.FC<AppLayoutLogoProps> = ({ badge = 'app' }): React.ReactElement => {
  const scrollToAnchor = useScrollToAnchor(10);
  const onScrollToAnchor = useCallback(() => scrollToAnchor("#scroll-to-top"), []);

  return (
    <Button
        href="/"
        onClick={onScrollToAnchor}
        className="font-bold items-center justify-start h-9 gap-0"
        size="none"
        variant="none"
    >
      <p className="link-title text-xl mr-1 hover:text-primary duration-300 transition-colors">Tasks</p>
      <p className="text-md py-1 px-2 bg-primary text-white rounded-md leading-none font-extrabold">
        {badge}
      </p>
    </Button>
  );
};
