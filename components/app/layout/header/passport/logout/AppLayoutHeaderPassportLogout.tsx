/** 1 Node - Modules, Components, Hooks, Icons */
import React from "react";
import {useNavigate} from "react-router-dom";
import {User} from "lucide-react";
import {toast} from "sonner";

/** 2 App - Components, Hooks */
import {AppPassportLoader} from "@/components/app/passport/loader/AppPassportLoader";
import {Button} from "@/components/shared/button/Button";

/** 3 Entities, Stores, Packages, Enums ... */
import {PassportStore} from "@/stores/PassportStore";
import {PASSPORT_STATUS} from "@/types/passport.d";

/**
 * @return {React.ReactElement} Сформированный DOM узел.
 */
export const AppLayoutHeaderPassportLogout: React.FC = (): React.ReactElement => {
    const router = useNavigate();

    console.log('router', router)

    /**
     * @return {Promise<void>}
     */
    const onUserLogout = async (): Promise<void> => {
        const promise = PassportStore.logout().finally(() => {
            PassportStore.setStatus(PASSPORT_STATUS.UNAUTHENTICATED);
            PassportStore.setSession(null);
        });

        toast.promise(promise, {
            loading: "Выход из системы...",
            success: "Успешный выход из системы",
            error: "Не удалось выйти из системы"
        });
    }

  return (
      <AppPassportLoader
          animation={(
              <div className="w-16 h-7 bg-secondary rounded-md animate-pulse mask mask-squircle"/>
          )}
      >
          {(authorized: boolean): React.ReactElement => authorized && (
              <Button
                  onClick={onUserLogout}
                  icon={{ path: User, color: 'none'}}
                  variant="secondary"
                  size="oblong"
                  text="sm"
              >
                  Выйти
              </Button>
          )}
      </AppPassportLoader>
  );
};
