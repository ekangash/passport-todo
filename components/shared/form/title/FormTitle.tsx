/** 1 Node - Modules, Components, Hooks, Icons */
import React from "react";
import { cn } from "@/packages/utils";
import { useFormContext } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";

/** 2 App - Components, Hooks */
import { FormLabel } from "@/components/shared/form/label/FormLabel";
import { useFormContext as useFormOtherContext } from "@/components/shared/form/context/FormContext";

/** 3 Entities, Stores, Packages, Enums ... */
import { obj, str } from "data-support";

/**
 * @interface FormTitleProps
 */
export interface FormTitleProps {
  name: string;
  label?: React.ReactNode;
  placeholder?: string;
  help?: string;
  withLabel?: boolean;
  withPlaceholder?: boolean;
  fill?: boolean;
  className?: string;
}

/**
 * @return {React.ReactElement}
 */
export const FormTitle: React.FC<FormTitleProps> = ({
  name,
  help = "",
  label = "",
  placeholder = "",
  withLabel = false,
  withPlaceholder = false,
  className = "",
}): React.ReactElement => {
  const {
    formState: { errors },
    register,
  } = useFormContext();
  const { disabled } = useFormOtherContext();

  return (
    <div className={cn("space-y-1", className)}>
      {withLabel && <FormLabel name={name}>{label}</FormLabel>}
      <TextareaAutosize
        {...register(name, { disabled: disabled.includes(name) })}
        {...(withPlaceholder && { placeholder })}
        className="text-3xl bg-transparent placeholder:text-minor overflow-hidden font-bold break-words outline-none text-background-foreground resize-none w-full"
      />
      {str.contains(help) && <p className="mt-1 text-xs text-gray-400">{help}</p>}
      <div className={cn("block-collapse", obj.isset(errors, name) && "block-collapse-open")}>
        <p className={cn("text-red-400 text-xs")} style={{ minHeight: 0 }}>
          {obj.isset(errors, name) && (errors?.[name]?.message as string | null)}
        </p>
      </div>
    </div>
  );
};
