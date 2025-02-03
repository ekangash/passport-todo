/** 1 Node - Modules, Components, Hooks, Icons */
import React from "react";
import { ArrowRightFromLine, User } from "lucide-react";
import { toast } from "sonner";
import { NavLink } from "react-router-dom";

/** 2 App - Components, Hooks */
import { AppPassportLoader } from "@/components/app/passport/loader/AppPassportLoader";
import { Button } from "@/components/shared/button/Button";

/** 3 Entities, Stores, Packages, Enums ... */
import { PassportStore } from "@/stores/PassportStore";
import { Icon } from "@/components/shared/icon/Icon";

/**
 * @return {React.ReactElement} Сформированный DOM узел.
 */
export const AppLayoutHeaderPassport: React.FC = (): React.ReactElement => {
  /**
   * @return {Promise<void>}
   */
  const onUserLogout = async (): Promise<void> => {
    const promise = PassportStore.logout();

    toast.promise(promise, {
      loading: "Выход из системы...",
      success: "Успешный выход из системы",
      error: "Не удалось выйти из системы",
    });
  };

  return (
    <AppPassportLoader
      animation={
        <>
          <div className="w-16 h-7 bg-secondary rounded-md animate-pulse mask mask-squircle" />
          <div className="w-16 h-7 bg-secondary rounded-md animate-pulse mask mask-squircle" />
        </>
      }
    >
      {(authorized: boolean): React.ReactElement =>
        authorized && (
          <>
            <NavLink to="/profile">
              <Button variant="secondary" size="oblong" text="sm">
                <Icon path={User} color="none" size={4} />
                Профиль
              </Button>
            </NavLink>
            <Button onClick={onUserLogout} variant="secondary" size="oblong" text="sm">
              Выйти
              <Icon path={ArrowRightFromLine} color="none" size={4} />
            </Button>
          </>
        )
      }
    </AppPassportLoader>
  );
};
