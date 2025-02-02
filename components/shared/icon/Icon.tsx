/** 1 Node - Modules, Components, Hooks, Icons */
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

/** 2 App - Components, Hooks */
/** 3 Entities, Stores, Packages, Enums ... */
import { cn } from "@/packages/utils";

export const spinnerVariants = cva("text-inherit transition-color duration-200", {
  variants: {
    variant: {
      spinner: "animate-spin",
      secondary: "bg-secondary group-hover:bg-secondary-hoverable rounded-md",
      ghost: "group-hover:bg-secondary rounded-md",
      primary: "text-primary-foreground shadow bg-primary hover:bg-primary/90 rounded-md",
      none: "",
    },
    color: {
      white: "text-white",
      green: "text-green-400",
      red: "text-red-400",
      black: "text-foreground",
      muted: "text-muted-foreground",
      minor: "text-minor",
      gray: "text-foreground opacity-80",
      secondaryForeground: "text-secondary-foreground",
      blue: "text-blue-500",
      primary: "text-primary",
      inherit: "inherit",
      none: "",
    },
    size: {
      3: "h-3 w-3",
      4: "h-4 w-4",
      5: "h-5 w-5",
      6: "h-6 w-6",
      7: "h-7 w-7",
      8: "h-8 w-8",
      10: "h-10 w-10",
      12: "h-12 w-12",
      16: "h-16 w-16",
      20: "h-20 w-20",
    },
  },
  defaultVariants: {
    size: 5,
    color: "inherit",
  },
});

export interface IconProps extends VariantProps<typeof spinnerVariants> {
  path: React.FC<React.ComponentProps<"svg">>;
  className?: string;
}

/**
 * @returns {React.ReactElement} Сформированный DOM узел.
 */
export const Icon = ({ size, color, variant, path: Path, className = "" }: IconProps) => {
  return <Path className={cn(spinnerVariants({ size, color, variant }), className)} />;
};
