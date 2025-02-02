/** 1 Node - Modules, Components, Hooks, Icons */
import React, { useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ValidationMode } from "react-hook-form/dist/types/form";
import { toast } from "sonner";
import { UseFormReturn } from "react-hook-form/dist/types";
import { ObjectSchema } from "yup";

/** 2 App - Components, Hooks */
import { AppExceptionHandler } from "@/components/app/exception/AppExceptionHandler";
import { FormCheckbox, FormCheckboxProps } from "@/components/shared/form/checkbox/FormCheckbox";
import { FormText, FormTextProps } from "@/components/shared/form/text/FormText";
import { FormTitle, FormTitleProps } from "@/components/shared/form/title/FormTitle";
import { FormProvider as FormInnerProvider } from "@/components/shared/form/context/FormContext";

/** 3 Entities, Stores, Packages, Enums ... */
import { REQUEST_MESSAGES } from "@/enums/request/messages";
import { obj } from "data-support";
import { yup } from "@/packages/yup";
import { yupSupport } from "@/packages/yup/support";
import { useConst } from "@/hooks/useConst";

/**
 * @type FormSubmitProp
 */
export interface FormSubmitProp {
  (formData: object, methods: UseFormReturn): Promise<any> | void;
}

export type FormChildrenProp = ((ctx: UseFormReturn) => any) | React.ReactNode;

/**
 * @interface FormProps
 */
interface FormProps {
  defaultValues?: object;
  resolver?: () => ObjectSchema<any>;
  disabled?: string[];
  mode?: keyof ValidationMode;
  reValidateMode?: "onBlur" | "onChange" | "onSubmit";
  onSubmit?: FormSubmitProp;
  children: FormChildrenProp;
  className?: string;
}

/**ё
 * @interface FormComponent
 */
interface FormComponent extends React.FC<FormProps> {
  Checkbox?: React.FC<FormCheckboxProps>;
  Text?: React.FC<FormTextProps>;
  Title?: React.FC<FormTitleProps>;
}

/**
 * @return {React.ReactElement} Сформированный DOM узел.
 */
export const Form: FormComponent = ({
  defaultValues = {},
  resolver = () => yupSupport.prepareSchemaWithLabels([], {}, yup.object({})),
  disabled = [],
  mode = "onBlur",
  reValidateMode = "onBlur",
  onSubmit = () => null,
  children,
  className = "",
}): React.ReactElement => {
  const schema: ObjectSchema<any> = useConst(() => resolver());
  const formMethods: UseFormReturn = useForm({
    mode: mode,
    reValidateMode: reValidateMode,
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmitCallback = useCallback(async (value: object): Promise<void> => {
    try {
      await onSubmit(obj.filter<object>(value, disabled), formMethods);
    } catch (exception) {
      new AppExceptionHandler()
        .fillEvents({
          onUnprocessableEntity: exception => {
            toast.error(REQUEST_MESSAGES.UNPROCESSABLE_ENTITY);
            const errors = exception.response?.data?.errors;

            if (obj.contains(errors)) {
              for (const [name, value] of Object.entries(errors as { [key: string]: string[] })) {
                formMethods.setError(name, { type: "manual", message: value.join(", ") });
              }
            }
          },
        })
        .handle(exception);
    }
  }, []);

  return (
    <FormProvider {...formMethods}>
      <FormInnerProvider schema={schema} disabled={disabled}>
        <form className={className} onSubmit={formMethods.handleSubmit(onSubmitCallback)}>
          {typeof children === "function" ? children(formMethods) : children}
        </form>
      </FormInnerProvider>
    </FormProvider>
  );
};

Form.Checkbox = FormCheckbox;
Form.Checkbox.displayName = "FormCheckbox";

Form.Text = FormText;
Form.Text.displayName = "FormText";

Form.Title = FormTitle;
Form.Title.displayName = "FormTitle";
