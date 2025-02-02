/** 1 Node - Modules, Components, Hooks, Icons */
import React from "react";
import { cn } from "@/packages/utils";

/** 2 App - Components, Hooks */
/** 3 Entities, Stores, Packages, Enums ... */
/**
 * @interface TaskCardTitleProps
 */
export interface TaskCardTitleProps {
  completed: boolean;
  children: React.ReactNode;
}

/**
 * @return {React.ReactElement} Сформированный DOM узел.
 */
export const TaskCardTitle: React.FC<TaskCardTitleProps> = ({
  children,
  completed,
}): React.ReactElement => {
  return (
    <p
      className={cn("text-md font-normal link-title line-clamp-2", {
        "line-through": completed,
      })}
    >
      {children}
    </p>
  );
};
