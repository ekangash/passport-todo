/** 1 Node - Modules, Components, Hooks, Icons */
import React from "react";
import { cn } from "@/packages/utils";

/** 2 App - Components, Hooks */
/** 3 Entities, Stores, Packages, Enums ... */
import { str } from "data-support";

/**
 * @interface PlaceholderProps
 */
interface PlaceholderProps {
  children: React.ReactNode;
  width?: number;
  filled?: boolean;
  oblong?: boolean;
  square?: boolean;
  stretchable?: boolean;
  description?: string;
  className?: string;
}

/**
 * Сообщение об ошибке.
 *
 * @param {!(string|number)} description Бейджик.
 * @param {!(string|number)} rounded Бейджик.
 * @param {!string} children Сообщение об ошибке.
 *
 * @return {JSX.Element} DOM-элемент
 */
export const LoaderPlaceholder: React.FC<PlaceholderProps> = ({
  children,
  width = 1500,
  filled = false,
  stretchable = false,
  oblong = false,
  square = false,
  description = null,
  className = null,
}) => {
  return (
    <div
      className={cn(
        {
          ["layout-px"]: oblong,
          ["layout-p"]: square,
        },
        className
      )}
    >
      <div
        className={cn(
          {
            ["bg-secondary"]: filled,
            ["rounded-2xl lg:rounded-3xl xl:rounded-[2rem]"]: filled && width >= 801,
            ["rounded-2xl lg:rounded-3xl"]: filled && width <= 800,
            ["h-full"]: stretchable,
            ["min-h-60"]: !stretchable,
          },
          "space-y-1 text-center w-full flex flex-col items-center justify-center"
        )}
      >
        <h5 className="font-bold leading-tight text-foreground text-xl">{children}</h5>
        {str.contains(description) && <p className="text-sm text-gray-400">{description}</p>}
      </div>
    </div>
  );
};
