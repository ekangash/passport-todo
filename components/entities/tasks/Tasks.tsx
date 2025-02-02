/** 1 Node - Modules, Components, Hooks, Icons */
import React, { useCallback } from "react";

/** 2 App - Components, Hooks */
import { TasksCreate } from "@/components/entities/tasks/create/TasksCreate";
import { TasksGroup } from "@/components/entities/tasks/group/TasksGroup";
import { Loader } from "@/components/shared/loader/Loader";
import { TasksActions } from "@/components/entities/tasks/actions/TasksActions";

/** 3 Entities, Stores, Packages, Enums ... */
import { TasksStore } from "@/stores/TasksStore";

/**
 * @return {React.ReactElement} Сформированный DOM узел.
 */
export const Tasks: React.FC = (): React.ReactElement => {
  /**
   * Инициализация загрузки задач
   *
   * @return {Promise<void>}
   */
  const initLoadTasks = useCallback(() => {
    TasksStore.fetchFromLocalStorage();

    return new Promise((resolve): void => {
      setTimeout(resolve, 2500);
    });
  }, []);

  return (
    <div className="flex w-full flex-col justify-center p-6 bg-window rounded-3xl border border-solid border-border">
      <TasksCreate />
      <div className="flex w-full flex-col justify-center">
        <TasksActions className="bg-window py-4" />
        <Loader expect={initLoadTasks} filled>
          {() => <TasksGroup />}
        </Loader>
      </div>
    </div>
  );
};
