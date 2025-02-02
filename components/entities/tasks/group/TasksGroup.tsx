/** 1 Node - Modules, Components, Hooks, Icons */
import React from "react";
import { observer } from "mobx-react-lite";
import { arr } from "data-support";

/** 2 App - Components, Hooks */
import { LoaderPlaceholder } from "@/components/shared/loader/placeholder/LoaderPlaceholder";
import { TaskCard } from "@/components/widgets/task/card/TaskCard";

/** 3 Entities, Stores, Packages, Enums ... */
import { TasksStore } from "@/stores/TasksStore";
import { Task, TaskStatus } from "@/types/task.d";

/**
 * @return {React.ReactElement} Сформированный DOM узел.
 */
export const TasksGroup: React.FC = observer((): React.ReactElement => {
  return (
    <div className="flex flex-col gap-1.5">
      {arr.contains(TasksStore.visibleByStatus) ? (
        TasksStore.visibleByStatus.map(
          (task: Task): React.ReactElement => (
            <TaskCard key={task.uuid}>
              <TaskCard.ActionsStatus
                defaultChecked={task.status === TaskStatus.COMPLETED}
                onChange={checked => {
                  TasksStore.updateByUuid(task.uuid, {
                    status: checked ? TaskStatus.COMPLETED : TaskStatus.ACTIVE,
                  }).sendToLocalStorage();
                }}
              />
              <TaskCard.Title completed={task.status === TaskStatus.COMPLETED}>
                {task.title}
              </TaskCard.Title>
              <TaskCard.ActionsTrash
                onClick={() => {
                  TasksStore.deleteByUuid(task.uuid).sendToLocalStorage();
                }}
                className="ml-auto"
              />
            </TaskCard>
          )
        )
      ) : (
        <LoaderPlaceholder
          className="w-full"
          description="Создайте или настройке задачу под текущий список"
          filled
          square={false}
        >
          Текущий список совсем пуст :(
        </LoaderPlaceholder>
      )}
    </div>
  );
});
