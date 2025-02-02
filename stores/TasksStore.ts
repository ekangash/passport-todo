/** 1 Node - Modules, Components, Hooks, Icons */
import { computed, action, makeObservable, observable } from "mobx";
import { nanoid } from "nanoid";
import { toJS } from "mobx";

/** 2 App - Components, Hooks */
/** 3 Entities, Stores, Packages, Enums ... */
import { Task, TaskUuid, TaskStatus } from "@/types/task.d";

/**
 * @class Tasks
 */
export class Tasks {
  tasks: Task[] = [];
  visibleActiveStatus?: TaskStatus;

  /**
   * @return {void}
   */
  constructor() {
    makeObservable(this, {
      tasks: observable,
      visibleActiveStatus: observable,
      createTask: action,
      changeVisibleActiveStatus: action,
      updateByUuid: action,
      deleteByUuid: action,
      visibleByStatus: computed,
    });
  }

  /**
   * Изменяет статус активных задач.
   *
   * @param {?TaskStatus} status Статус.
   *
   * @return {this}
   */
  changeVisibleActiveStatus(status?: TaskStatus): this {
    this.visibleActiveStatus = status;

    return this;
  }

  /**
   * Гетер задач по активному статусу.
   *
   * @return {Task[]} Активные задачи.
   */
  get visibleByStatus(): Task[] {
    if (this.visibleActiveStatus === undefined) {
      return toJS(this.tasks);
    }

    const visibleTasks: Task[] = this.tasks.filter((task: Task): boolean => {
      return task.status === this.visibleActiveStatus;
    }, []);

    return toJS(visibleTasks);
  }

  /**
   * Формирует новую задачу
   *
   * @param {Pick<Task,'title'> & Partial<Omit<Task,'title'>>} props Заголовок новой задачи
   *
   * @return {Task} Созданную задачу
   */
  createTask(props: Pick<Task, "title"> & Partial<Omit<Task, "title">>): Task {
    const newTask = {
      uuid: nanoid(16),
      status: TaskStatus.ACTIVE,
      ...props,
    };

    this.tasks.unshift(newTask);

    return newTask;
  }

  /**
   * Обновляет свойства задачи по идентификатору.
   *
   * @param {TaskUuid} uuid
   * @param {Partial<Task>} taskProps
   *
   * @return {this}
   */
  updateByUuid(uuid: TaskUuid, taskProps: Partial<Task>): this {
    for (const taskInx of this.tasks.keys()) {
      const task = this.tasks[taskInx];

      if (task.uuid === uuid) {
        this.tasks[taskInx] = { ...task, ...taskProps };
      }
    }

    return this;
  }

  /**
   * Удаляет задачу по идентификатору.
   *
   * @param {TaskUuid} uuid
   *
   * @return {this}
   */
  deleteByUuid(uuid: TaskUuid): this {
    for (const taskInx of this.tasks.keys()) {
      const task: Task = this.tasks[taskInx];

      if (task.uuid === uuid) {
        this.tasks.splice(taskInx, 1);
      }
    }

    return this;
  }

  /**
   * Отправляет задачи в локальное хранилище.
   *
   * @return {this}
   */
  sendToLocalStorage(): this {
    localStorage.setItem("tasks", JSON.stringify(toJS(this.tasks)));

    return this;
  }

  /**
   * Получает задачи из локального хранилища.
   *
   * @return {this}
   */
  fetchFromLocalStorage(): this {
    this.tasks = JSON.parse(localStorage.getItem("tasks") || "[]") as Task[];

    return this;
  }
}

/**
 * @var TasksStore
 */
export const TasksStore: Tasks = new Tasks();
