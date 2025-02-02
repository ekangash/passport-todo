/** 1 Node - Modules, Components, Hooks, Icons */
import React from "react";
import { toast } from "sonner";
import { UseFormReturn } from "react-hook-form/dist/types";
import { obj } from "data-support";

/** 2 App - Components, Hooks */
import { Button } from "@/components/shared/button/Button";
import { Form } from "@/components/shared/form/Form";

/** 3 Entities, Stores, Packages, Enums ... */
import { yup } from "@/packages/yup";
import { yupSupport } from "@/packages/yup/support";
import { TasksStore } from "@/stores/TasksStore";

/**
 * @return {React.ReactElement} Сформированный DOM узел.
 */
export const TasksCreate: React.FC = (): React.ReactElement => {
  /**
   * Обновляет персональные атрибуты профиля.
   *
   * @param {object} data Данные формы.
   * @param {UseFormReturn} formMethods
   *
   * @return {void}
   */
  const pushTaskToList = (data: object, formMethods: UseFormReturn): void => {
    toast.promise(
      new Promise((resolve, reject) => {
        TasksStore.createTask(obj.only(data, ["title"]));
        TasksStore.sendToLocalStorage();
        formMethods.reset();

        setTimeout(() => {
          resolve("");
        }, 500);
      }),
      {
        loading: "Добавление задачи...",
        success: "Задача успешно добавлен",
        error: "Упс, мы потерпели неудачу :(",
      }
    );
  };

  const formResolver = () =>
    yupSupport.prepareSchemaWithLabels(
      ["title"],
      {
        title: "Наименование",
      },
      yup.object({
        title: yup.string().required("Упас, а заголовок то не указан :("),
      })
    );

  return (
    <Form
      className="flex items-center space-x-3"
      defaultValues={{ title: "" }}
      resolver={formResolver}
      onSubmit={pushTaskToList}
    >
      {({ formState: { isSubmitting } }) => (
        <>
          <Form.Title
            label="Наименование"
            placeholder="Заголовок"
            name="title"
            className="w-full"
            withPlaceholder
          />
          <Button
            type="submit"
            loading={isSubmitting}
            disabled={isSubmitting}
            size="oblong-1.5"
            className="w-40 ml-auto"
            variant="primary"
          >
            Добавить
          </Button>
        </>
      )}
    </Form>
  );
};
