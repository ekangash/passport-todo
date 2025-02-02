/** 1 Node - Modules, Components, Hooks, Icons */
import React from "react";
import { Clipboard, ClipboardCheck, ClipboardList } from "lucide-react";

/** 2 App - Components, Hooks */
import { Button } from "@/components/shared/button/Button";
import { Icon } from "@/components/shared/icon/Icon";
import { TasksStore } from "@/stores/TasksStore";

/** 3 Entities, Stores, Packages, Enums ... */
import { TaskStatus } from "@/types/task.d";
import { observer } from "mobx-react-lite";
import { cn } from "@/packages/utils";

interface TasksActionsProps {
  className?: string;
}

/**
 * @return {React.ReactElement} Сформированный DOM узел.
 */
export const TasksActions: React.FC<TasksActionsProps> = observer(
  ({ className = "" }): React.ReactElement => {
    return (
      <div className={cn("top-16 sticky flex items-center justify-center space-x-1", className)}>
        <Button
          variant={TasksStore.visibleActiveStatus === undefined ? "secondary" : "ghost"}
          onClick={() => {
            TasksStore.changeVisibleActiveStatus();
          }}
        >
          <Icon path={ClipboardList} size={4} />
          Все
        </Button>
        <Button
          variant={TasksStore.visibleActiveStatus === TaskStatus.ACTIVE ? "secondary" : "ghost"}
          onClick={() => {
            TasksStore.changeVisibleActiveStatus(TaskStatus.ACTIVE);
          }}
        >
          <Icon path={Clipboard} size={4} />
          Активные
        </Button>
        <Button
          variant={TasksStore.visibleActiveStatus === TaskStatus.COMPLETED ? "secondary" : "ghost"}
          onClick={() => {
            TasksStore.changeVisibleActiveStatus(TaskStatus.COMPLETED);
          }}
        >
          <Icon path={ClipboardCheck} size={4} />
          Выполненные
        </Button>
      </div>
    );
  }
);
