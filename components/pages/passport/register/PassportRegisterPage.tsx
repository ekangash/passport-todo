/** 1 Node - Modules, Components, Hooks, Icons */
import React, { useState } from "react";
import { type UseFormReturn } from "react-hook-form/dist/types";
import { obj } from "data-support";
import { toast } from "sonner";
import { Mail, Lock } from "lucide-react";
import { NavLink } from "react-router-dom";

/** 2 App - Components, Hooks */
import { Button } from "@/components/shared/button/Button";
import { Strip } from "@/components/shared/strip/Strip";
import { Form } from "@/components/shared/form/Form";

/** 3 Entities, Stores, Packages, Enums ... */
import { PassportStore } from "@/stores/PassportStore";
import { yupSupport } from "@/packages/yup/support";
import { yup } from "@/packages/yup";

/**
 * Страница регистрации.
 *
 * @return {JSX.Element} DOM-элемент
 */
export const PassportRegisterPage: React.FC = (): React.ReactElement => {
  const [registered, setRegistered] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  /**
   * Регистрация пользователя в систему.
   *
   * @param {object} attributes
   * @param {UseFormReturn} formMethods
   *
   * @return {Promise<void>}
   */
  const onRegisterUser = async (attributes: object, formMethods: UseFormReturn): Promise<void> => {
    setSubmitting(true);
    const promise = PassportStore.register(
      obj.get(attributes, "email"),
      obj.get(attributes, "password"),
      obj.get(attributes, "fullname")
    )
      .then(() => {
        setSubmitting(false);
        setRegistered(true);
      })
      .catch(exception => {
        formMethods.setError("email", {
          type: "manual",
          message: exception.response?.data?.message || "Учётные данные недействительны",
        });
        setSubmitting(false);
        throw exception;
      });

    toast.promise(promise, {
      loading: "Регистрация учётной записи...",
      success: "Новая учетная запись успешно зарегистрирована",
      error: "Неудачная регистрация учётной записи :(",
    });

    return promise;
  };

  const formResolver = () =>
    yupSupport.prepareSchemaWithLabels(
      ["fullname", "email", "password", "password_confirmation", "privacy", "terms"],
      {
        fullname: "Ф.И.О",
        password: "Пароль",
        password_confirmation: "Подтверждение пароля",
        email: "Ваш адрес электронной почты",
        privacy: "Политика конфиденциальности",
      },
      yup.object().shape({
        fullname: yup.string().max(50).required("Поле «${label}» должно быть заполнено"),
        email: yup
          .string()
          .email("Не похоже на адрес электронной почты")
          .required("Требуется указать электронную почту"),
        password: yup.string().min(8, "Не менее 8 символов").required("Требуется указать пароль"),
        password_confirmation: yup
          .string()
          .required("Требуется подтвердить пароль")
          .min(8, "Не менее 8 символов")
          .oneOf([yup.ref("password")], "Указанные пароли должны совпадать"),
        privacy: yup.boolean().oneOf([true], "Поле «${label}» должно быть отмечено"),
      })
    );

  return registered ? (
    <>
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold leading-none text-primary">Учетная запись создана</h2>
        <p className="text-gray-400 text-xs">
          На указанный вами адрес электронной почты было отправлено письмо со ссылкой для
          подтверждения регистрации. Перейдите по ссылке в письме, чтобы активировать свой личный
          профиль.
        </p>
      </div>
      <NavLink to="/">
        <Button className="w-full" variant="secondary" size="oblong-2">
          Перейти к приложению
        </Button>
      </NavLink>
    </>
  ) : (
    <Form
      className={`flex flex-col gap-4`}
      defaultValues={{}}
      resolver={formResolver}
      onSubmit={onRegisterUser}
    >
      {({ formState: { errors }, clearErrors }) => (
        <>
          <p className="text-gray-400 text-xs text-center">
            У вас уже есть доступная учётная запись в системе? Тогда стоит заполнить форму
            авторизации:
          </p>
          <NavLink to="/passport/login">
            <Button className="w-full" variant="secondary" size="oblong-2">
              Уже есть учетная запись
            </Button>
          </NavLink>
          <Strip text="или" />
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold leading-none text-secondary-foreground">
              Регистрация
            </h2>
            <p className="text-gray-400 text-xs">
              Создайте новую учётную запись и получите доступ к возможностям сервиса.
            </p>
          </div>
          {obj.isset(errors, "shared") && (
            <p className="text-red-400 text-xs">{errors?.shared?.message as string | null}</p>
          )}
          <div className="space-y-4">
            <Form.Text name="fullname" label="Ф.И.О" withPlaceholder withLabel />
            <Form.Text
              name="email"
              label="Ваш адрес электронной почты"
              rightIcon={Mail}
              withPlaceholder
              withLabel
            />
            <Form.Text
              name="password"
              label="Пароль"
              type="password"
              rightIcon={Lock}
              withPlaceholder
              withLabel
            />
            <Form.Text
              type="password"
              label="Подтверждение пароля"
              name="password_confirmation"
              rightIcon={Lock}
              withPlaceholder
              withLabel
            />
            <Form.Checkbox
              name="privacy"
              label="Политика конфиденциальности"
              help="Отмечая пункт, подтверждаете соглашение политики конфиденциальности"
              standard
              withLabel
            />
          </div>
          <Button
            onClick={() => clearErrors()}
            type="submit"
            loading={submitting}
            disabled={submitting}
            className="w-full"
            size="oblong-2"
            variant="primary"
          >
            Продолжить
          </Button>
          <p className="flex flex-wrap justify-center text-gray-400 text-xs text-center">
            Регистрируясь, вы соглашаетесь с условиями использования нашего сервиса.
          </p>
        </>
      )}
    </Form>
  );
};
