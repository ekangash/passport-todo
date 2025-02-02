export enum TaskStatus {
  ACTIVE,
  COMPLETED,
}

export type TaskUuid = string;

export interface Task {
  uuid: TaskUuid;
  title: string;
  status: TaskStatus;
}
