/** 1 Node - Modules, Components, Hooks, Icons */
import React, { memo } from "react";

/** 2 App - Components, Hooks */
import {
  TaskCardActionsTrash,
  TaskCardActionsTrashProps,
} from "@/components/widgets/task/card/actions/trash/TaskCardActionsTrash";
import {
  TaskCardActionsStatus,
  TaskCardActionsStatusProps,
} from "@/components/widgets/task/card/actions/status/TaskCardActionsStatus";

/** 3 Entities, Stores, Packages, Enums ... */
import { cn } from "@/packages/utils";
import {
  TaskCardTitle,
  TaskCardTitleProps,
} from "@/components/widgets/task/card/title/TaskCardTitle";

/**
 * @interface TaskCardProps
 */
interface TaskCardProps {
  children?: React.ReactNode;
  className?: string;
}

interface TaskCardFC extends React.NamedExoticComponent<TaskCardProps> {
  ActionsTrash?: React.FC<TaskCardActionsTrashProps>;
  ActionsStatus?: React.FC<TaskCardActionsStatusProps>;
  Title?: React.FC<TaskCardTitleProps>;
}

/**
 * Карточка публикации.
 *
 * @return {React.ReactElement} Сформированный DOM узел.
 */
export const TaskCard: TaskCardFC = memo<TaskCardProps>(({ children = null, className = "" }) => {
  return (
    <div className={cn("flex items-center px-5 py-3 rounded-2xl bg-secondary gap-2", className)}>
      {children}
    </div>
  );
});

TaskCard.displayName = "TaskCard";

TaskCard.ActionsTrash = TaskCardActionsTrash;
TaskCard.ActionsTrash.displayName = TaskCardActionsTrash.displayName;

TaskCard.ActionsStatus = TaskCardActionsStatus;
TaskCard.ActionsStatus.displayName = TaskCardActionsStatus.displayName;

TaskCard.Title = TaskCardTitle;
TaskCard.Title.displayName = TaskCardTitle.displayName;
