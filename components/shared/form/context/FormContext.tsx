/** 1 Node - Modules, Components, Hooks, Icons */
import React from "react";
import { yup } from "@/packages/yup";
import { ObjectSchema } from "yup";

/** 2 App - Components, Hooks */
/** 3 Entities, Stores, Packages, Enums ... */

/**
 * @interface FormContext
 */
export interface FormContext {
  schema: ObjectSchema<any>;
  disabled: string[];
}

/**
 * @return {React.ReactElement} Сформированный DOM узел.
 */
const HookFormContext = React.createContext<FormContext>({
  schema: yup.object({}),
  disabled: [],
});

/**
 * @returns {FormContext} Сформированный DOM узел.
 */
export const useFormContext = (): FormContext => React.useContext(HookFormContext);

/**
 * @interface FormProviderProps
 */
interface FormProviderProps extends FormContext {
  children: React.ReactNode;
}

/**
 * @param {React.ReactElement} children
 * @param {ObjectSchema<any>} schema
 * @param {string[]} disabled
 *
 * @return {React.ReactElement} Сформированный DOM узел.
 */
export const FormProvider: React.FC<FormProviderProps> = ({ schema, disabled, children }) => {
  return (
    <HookFormContext.Provider value={{ schema, disabled }}>{children}</HookFormContext.Provider>
  );
};
