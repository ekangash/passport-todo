/** 1 Node - Modules, Components, Hooks, Icons */
import React from "react";
import { Trash } from "lucide-react";

/** 2 App - Components, Hooks */
import { Button } from "@/components/shared/button/Button";
import { Icon } from "@/components/shared/icon/Icon";

/** 3 Entities, Stores, Packages, Enums ... */

/**
 * @interface TaskCardActionsTrashProps
 */
export interface TaskCardActionsTrashProps {
  onClick: () => void;
  className?: string;
}

/**
 * Карточка публикации.
 *
 * @return {React.ReactElement} Сформированный DOM узел.
 */
export const TaskCardActionsTrash: React.FC<TaskCardActionsTrashProps> = ({
  onClick,
  className,
}): React.ReactElement => {
  return (
    <Button onClick={onClick} className={className} variant="secondary" size="square">
      <Icon path={Trash} color="red" size={4} />
    </Button>
  );
};
