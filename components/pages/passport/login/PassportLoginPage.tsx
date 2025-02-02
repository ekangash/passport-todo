/** 1 Node - Modules, Components, Hooks, Icons */
import React, {useState} from 'react';
import {useSearchParams, useHistory} from "react-router-dom";
import {Mail, Lock} from "lucide-react";
import {UseFormReturn} from "react-hook-form/dist/types";
import {toast} from "sonner";
import {obj} from "data-support";
import {AxiosError} from "axios";
import {yupSupport} from "@/packages/yup/support";
import {yup} from "@/packages/yup/index";

/** 2 App - Components, Hooks */

import {Strip} from "@/components/shared/strip/Strip";
import {Form} from "@/components/shared/form/Form";
import {Button} from "@/components/shared/button/Button";

/** 3 Entities, Stores, Packages, Enums ... */

import {cn} from "@/packages/utils";
import {REQUEST_STATUSES} from "@/enums/request/statuses";
import {PassportStore} from "@/stores/PassportStore";

const UNDEFINED_ERR0R = 'undefined_error';
/**
 * Страница авторизации.
 *
 * @return {JSX.Element} DOM-элемент
 */
export const PassportLoginPage: React.FC = (): React.ReactElement => {
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [urlSearchParams] = useSearchParams();
    const history = useHistory();

    console.log('searchParams', urlSearchParams.get('callbackUrl'))

    /**
     * Авторизация пользователя в систему
     *
     * @return {Promise<void>}
     */
    const onUserLogging = async (attributes: object, formMethods: UseFormReturn): Promise<void> => {
        setSubmitting(true);

        const promise = PassportStore.login().then(async (): Promise<void> => {
            const session = await PassportStore.initSession();
            const pathToRedirect: string = urlSearchParams.get('callbackUrl') || '/';
            history.push(pathToRedirect);
        }).catch((exception) => {
            if (exception instanceof AxiosError) {
                const responseStatus: number = exception?.response?.status || 0;

                if (responseStatus === REQUEST_STATUSES.BAD_REQUEST) {
                    formMethods.setError(UNDEFINED_ERR0R, { type: "manual", message: exception?.response?.data?.message });

                    throw exception;
                }   else if (responseStatus === REQUEST_STATUSES.UNAUTHORIZED) {
                    formMethods.setError(UNDEFINED_ERR0R, { type: "manual", message: exception?.response?.data?.message });

                    throw exception;
                } else if (responseStatus === REQUEST_STATUSES.FORBIDDEN) {
                    formMethods.setError('password', { type: "manual", message: exception?.response?.data?.message });

                    throw exception;
                }  else if (responseStatus === REQUEST_STATUSES.INTERNAL_SERVER) {
                    formMethods.setError(UNDEFINED_ERR0R, { type: "manual", message: exception?.response?.data?.message });

                    throw exception;
                }
            }

            formMethods.setError(UNDEFINED_ERR0R, { type: "manual", message: 'Неизвестная ошибка, попробуйте снова' });

            throw exception;
        }).finally(() => {
            setSubmitting(false);
        })

        toast.promise(promise, {
            loading: "Авторизация учётной записи...",
            success: "Учётная запись авторизированна",
            error: "Не удалось войти в учётную запись"
        });
    };

    const formResolver = () => yupSupport.prepareSchemaWithLabels(
        ['email', 'password'],
        {
            password: 'Пароль',
            email: 'Адрес электронной почты',
        },
        yup.object().shape({
            fullname: yup.string().max(50).required('Поле «${label}» должно быть заполнено'),
            email: yup
                .string()
                .email('Не похоже на адрес электронной почты')
                .required('Требуется указать электронную почту'),
            password: yup
                .string()
                .min(8, 'Не менее 8 символов')
                .required('Требуется указать пароль'),
        }));


    return (
        <Form
            defaultValues={{}}
            resolver={formResolver}
            onSubmit={onUserLogging}
        >
            {({clearErrors, formState: { errors }}) => (
                <>
                    <div className="space-y-4">
                        <p className="text-gray-400 text-xs">
                            У вас нет ещё доступной учётной записи в системе? Тогда стоит заполнить форму регистрации:
                        </p>
                        <Button
                            href={"/passport/register"}
                            variant="secondary"
                            className="w-full"
                            size="oblong-2"
                        >
                            Регистрировать учетную запись
                        </Button>
                        <Strip text="или" />
                        <div className="space-y-2 text-center">
                            <h2 className="text-2xl font-bold leading-none text-secondary-foreground">
                                Авторизация
                            </h2>
                            <p className="text-gray-400 text-xs">
                                Введите свой адрес электронной почты и пароль, чтобы войти в систему для получения доступа к использованию сервиса.
                            </p>
                        </div>
                        <div className={cn('block-collapse', obj.isset(errors, UNDEFINED_ERR0R) && 'block-collapse-open')}>
                            <p
                                className={cn('text-red-400 text-xs')}
                                style={{ minHeight: 0 }}
                            >
                                {obj.isset(errors, UNDEFINED_ERR0R) && (errors?.[UNDEFINED_ERR0R]?.message as string|null)}
                            </p>
                        </div>
                        <Form.Text
                            name="email"
                            label="Адрес электронной почты"
                            rightIcon={Mail}
                            withPlaceholder
                            withLabel
                        />
                        <Form.Text
                            label="Пароль"
                            name="password"
                            type="password"
                            rightIcon={Lock}
                            withPlaceholder
                            withLabel
                        />
                        <Button
                            onClick={() => clearErrors()}
                            type="submit"
                            loading={submitting}
                            disabled={submitting}
                            className="w-full"
                            variant="primary"
                            size="oblong-2"
                        >
                            Войти в учетную запись
                        </Button>
                        <p className="flex flex-wrap justify-center text-gray-400 text-xs">
                            Авторизуясь, вы соглашаетесь с условиями использования нашего сервиса.
                        </p>
                    </div>
                </>
            )}
        </Form>
    );
};