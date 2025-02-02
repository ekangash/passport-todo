/** 1 Node - Modules, Components, Hooks, Icons */
import React from "react";

/** 2 App - Components, Hooks */
import { useFormContext as useFormOtherContext } from "@/components/shared/form/context/FormContext";

/** 3 Entities, Stores, Packages, Enums ... */
import { cn } from "@/packages/utils";
import { yupSupport } from "@/packages/yup/support";

/**
 * @interface FormLabelProps
 */
interface FormLabelProps {
  children: React.ReactNode;
  name: string;
  htmlFor?: string;
}

/**
 * Метка поля формы
 *
 * @param {string} name Наименование поля
 * @param {string} label Метка
 * @param {string} htmlFor
 *
 * @return {JSX.Element} DOM-элемент
 */
export const FormLabel: React.FC<FormLabelProps> = ({
  children,
  name,
  htmlFor = "",
}): React.ReactElement | null => {
  const { schema } = useFormOtherContext();

  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        {
          "after:ml-0.5 after:text-red-500 after:content-['*']": yupSupport.attributeIsRequired(
            name,
            schema
          ),
        },
        "block text-sm font-medium text-foreground"
      )}
    >
      {children}
    </label>
  );
};
