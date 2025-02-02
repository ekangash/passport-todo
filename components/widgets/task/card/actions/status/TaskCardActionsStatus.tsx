/** 1 Node - Modules, Components, Hooks, Icons */
import React from "react";

/** 2 App - Components, Hooks */
/** 3 Entities, Stores, Packages, Enums ... */
/**
 * @interface TaskCardActionsStatusProps
 */
export interface TaskCardActionsStatusProps {
  defaultChecked: boolean;
  onChange: (checked: boolean) => void;
}

/**
 * Карточка публикации.
 *
 * @return {React.ReactElement} Сформированный DOM узел.
 */
export const TaskCardActionsStatus: React.FC<TaskCardActionsStatusProps> = ({
  defaultChecked,
  onChange,
}): React.ReactElement => {
  const onCheckboxChange = (): void => {
    onChange(!defaultChecked);
  };

  return <input type="checkbox" defaultChecked={defaultChecked} onChange={onCheckboxChange} />;
};
