/** 1 Node - Modules, Components, Hooks, Icons */
import React from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "@/packages/utils";

/** 2 App - Components, Hooks */
import { obj, str } from "data-support";
import { useFormContext as useFormOtherContext } from "@/components/shared/form/context/FormContext";
import { yupSupport } from "@/packages/yup/support";

/** 3 Entities, Stores, Packages, Enums ... */

/**
 * @interface FormCheckboxProps
 */
export interface FormCheckboxProps {
  name: string;
  type?: string;
  help?: string;
  label?: React.ReactNode;
  standard?: boolean;
  filled?: boolean;
  withLabel?: boolean;
  className?: string;
}

/**
 * @returns {React.ReactElement} Сформированный DOM узел.
 */
export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  name,
  type = "checkbox",
  help = "",
  withLabel = false,
  standard = false,
  filled = false,
  label = null,
  className = "",
}) => {
  const {
    formState: { errors },
    register,
  } = useFormContext();
  const { schema, disabled } = useFormOtherContext();

  return (
    <div className={cn("flex flex-col items-start space-y-1.5", className)}>
      <label
        className={cn(
          {
            ["hover:bg-secondary text-gray-800 hover:opacity-100 ease-in-out px-2 py-1.5"]:
              standard,
            ["bg-secondary hover:bg-secondary-hoverable ease-in-out px-2 py-1.5"]: filled,
            ["cursor-pointer"]: !disabled.includes(name),
          },
          "flex space-x-1.5 transition-colors duration-300 rounded-lg items-start text-foreground"
        )}
        htmlFor={name}
      >
        {type === "checkbox" && (
          <div className="flex h-5 items-center">
            <input
              id={name}
              type="checkbox"
              {...register(name, { disabled: disabled.includes(name) })}
              className={cn(
                "border border-solid border-gray-200 text-blue-500 shadow-sm focus:border-blue-600",
                "focus:ring-opacity-20",
                "disabled:text-gray-500 disabled:cursor-default w-3.5 h-3.5 rounded-2xl transition ease-in-out cursor-pointer",
                "focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 focus:ring-offset-0"
              )}
            />
          </div>
        )}
        {type === "toggle" && (
          <div className="relative inline-flex cursor-pointer items-center">
            <input
              id={name}
              type="checkbox"
              {...register(name, { disabled: disabled.includes(name) })}
              className="peer sr-only"
            />
            <div
              className="h-6 w-11 rounded-full bg-secondary after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full
                        after:bg-white after:shadow after:transition-all after:content-[''] hover:bg-gray-200 peer-checked:bg-blue-600 peer-checked:after:translate-x-full
                        peer-checked:after:border-white peer-focus:ring-2 peer-focus:ring-blue-200 peer-disabled:cursor-not-allowed peer-disabled:bg-secondary
                         peer-disabled:after:bg-gray-50 transition-colors duration-300"
            />
          </div>
        )}
        {withLabel && (
          <div className="space-y-0.5">
            <div
              className={cn(
                {
                  "after:ml-0.5 after:text-red-500 after:content-['*'] flex":
                    yupSupport.attributeIsRequired(name, schema),
                },
                "flex text-sm font-medium text-foreground"
              )}
            >
              {label}
            </div>
            {str.contains(help) && <p className="mt-1 text-xs text-gray-400">{help}</p>}
          </div>
        )}
      </label>
      <div className={cn("block-collapse", obj.isset(errors, name) && "block-collapse-open")}>
        <p className={cn("text-red-400 text-xs")} style={{ minHeight: 0 }}>
          {obj.isset(errors, name) && (errors?.[name]?.message as string | null)}
        </p>
      </div>
    </div>
  );
};
