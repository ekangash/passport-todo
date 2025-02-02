/** 1 Node - Modules, Components, Hooks, Icons */
import React from "react";
import { cn } from "@/packages/utils";
import { useFormContext } from "react-hook-form";

/** 2 App - Components, Hooks */
import { FormLabel } from "@/components/shared/form/label/FormLabel";
import { Icon } from "@/components/shared/icon/Icon";
import { useFormContext as useFormOtherContext } from "@/components/shared/form/context/FormContext";

/** 3 Entities, Stores, Packages, Enums ... */
import { obj, str } from "data-support";

/**
 * @interface FormTextProps
 */
export interface FormTextProps {
  name: string;
  as?: string;
  type?: string;
  label?: React.ReactNode;
  placeholder?: string;
  size?: string;
  help?: string;
  rows?: number;
  withLabel?: boolean;
  withPlaceholder?: boolean;
  fill?: boolean;
  leftIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  rightIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  className?: string;
}

/**
 * @return {React.ReactElement}
 */
export const FormText: React.FC<FormTextProps> = ({
  name,
  as = "input",
  type = "text",
  help = "",
  size = "xs",
  rows = 6,
  label = "",
  placeholder = "",
  withLabel = false,
  withPlaceholder = false,
  leftIcon = null,
  rightIcon = null,
  className = "",
}): React.ReactElement => {
  const {
    formState: { errors },
    register,
  } = useFormContext();
  const { disabled } = useFormOtherContext();
  const leftIconIsDefined = leftIcon !== null && leftIcon !== undefined;
  const rightIconIsDefined = rightIcon !== null && rightIcon !== undefined;

  const classes = cn(
    {
      ["pl-9 pr-3"]: leftIconIsDefined,
      ["pl-3 pr-9"]: rightIconIsDefined,
      ["px-3"]: !leftIconIsDefined || !rightIconIsDefined,
      ["focus:border-red-300 border-red-300"]: obj.isset(errors, name),
      [`focus:border-blue-400 border-border`]: !obj.isset(errors, name),
    },
    `text-${size}`,
    "bg-clip-padding m-0 w-full py-2 font-normal text-foreground border border-solid rounded-lg bg-secondary",
    "transition ease-in-out disabled:bg-secondary disabled:text-gray-400 focus:outline-none shadow-sm"
  );

  return (
    <div className={cn("space-y-1.5", className)}>
      {withLabel && <FormLabel name={name}>{label}</FormLabel>}
      <div className="relative flex">
        {leftIconIsDefined && (
          <Icon
            path={leftIcon}
            className={"pointer-events-none absolute h-full left-2.5"}
            size={5}
            color="gray"
          />
        )}
        {as === "input" && (
          <input
            {...register(name, { disabled: disabled.includes(name) })}
            {...(withPlaceholder && { placeholder })}
            className={classes}
            type={type}
          />
        )}
        {as === "textarea" && (
          <textarea
            {...register(name, { disabled: disabled.includes(name) })}
            {...(withPlaceholder && { placeholder })}
            className={classes}
            rows={rows}
          />
        )}
        {rightIconIsDefined && (
          <Icon
            path={rightIcon}
            className={"pointer-events-none absolute h-full right-2.5"}
            color="gray"
            size={5}
          />
        )}
      </div>
      {str.contains(help) && <p className="mt-1 text-xs text-gray-400">{help}</p>}
      <div className={cn("block-collapse", obj.isset(errors, name) && "block-collapse-open")}>
        <p className={cn("text-red-400 text-xs")} style={{ minHeight: 0 }}>
          {obj.isset(errors, name) && (errors?.[name]?.message as string | null)}
        </p>
      </div>
    </div>
  );
};
