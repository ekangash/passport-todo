/** 1 Node - Modules, Components, Hooks, Icons */
import React from "react";
import { Shield, User, UserPlus } from "lucide-react";
import { NavLink } from "react-router-dom";

/** 2 App - Components, Hooks */
import { Button } from "@/components/shared/button/Button";
import { Icon } from "@/components/shared/icon/Icon";
import { Caption } from "@/components/shared/caption/Caption";

/** 3 Entities, Stores, Packages, Enums ... */

/**
 * @return {React.ReactElement} Сформированный DOM узел.
 */
export const AppLayoutPassportUnauthenticated: React.FC = () => {
  return (
    <>
      <Caption
        description="Приложение доступно только для авторизированных пользователей"
        className="mb-8"
      >
        Доступ запрещен
      </Caption>
      <div className="flex w-full flex-col justify-center items-center p-6 bg-window rounded-3xl border border-solid border-border space-y-4">
        <div className="text-center space-y-3">
          <h2 className="text-lg font-bold leading-5">
            Войдите или зарегистрируйте новую учетную запись.
          </h2>
          <div className="flex justify-center items-center text-gray-400 space-x-1">
            <Icon path={Shield} size={4} />
            <p className="text-xs">Ваши данные в безопасности</p>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <NavLink to={`/passport/login?callbackUrl=${location.pathname}`}>
            <Button className="w-full" variant="primary" size="oblong-2" text="sm">
              <Icon path={User} color="none" />
              Войти в учётную запись
            </Button>
          </NavLink>
          <NavLink to={`/passport/register?callbackUrl=${location.pathname}`}>
            <Button className="w-full" variant="secondary" size="oblong-2" text="sm">
              <Icon path={UserPlus} color="none" />
              Регистрировать учетную запись
            </Button>
          </NavLink>
          <p className="text-gray-400 text-xs space-x-1 text-center">
            Пользуясь приложением, вы принимаете и соглашаетесь с нашими правилами использования
            сервиса.
          </p>
        </div>
      </div>
    </>
  );
};
