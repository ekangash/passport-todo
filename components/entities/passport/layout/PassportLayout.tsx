/** 1 Node - Modules, Components, Hooks, Icons */
import React, { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useNavigate, useSearchParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { num } from "data-support";

/** 2 App - Components, Hooks */
/** 3 Entities, Stores, Packages, Enums ... */
import { ArrowLeft } from "lucide-react";
import { AppPassportLoader } from "@/components/app/passport/loader/AppPassportLoader";
import { AppLayoutLogo } from "@/components/app/layout/logo/AppLayoutLogo";
import { Button } from "@/components/shared/button/Button";
import { Icon } from "@/components/shared/icon/Icon";

/** 2 App - Components, Hooks */
import { cn } from "@/packages/utils";
import { PassportStore } from "@/stores/PassportStore";
import { PASSPORT_STATUS } from "@/types/passport.d";

/**
 * Главная страница макетов.
 *
 * @returns {JSX.Element} DOM-элемент
 */
export const PassportLayout: React.FC = observer(() => {
  const [urlSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect((): void => {
    if (
      location.pathname.includes("/passport") &&
      PassportStore.status === PASSPORT_STATUS.AUTHENTICATED
    ) {
      const pathToRedirect: string = urlSearchParams.get("callbackUrl") || "/";
      navigate(pathToRedirect);
    }
  }, [PassportStore.status]);

  return (
    <AppPassportLoader>
      {(authorized: boolean): React.ReactElement =>
        !authorized && (
          <div className="xs:h-svh h-screen">
            <div className={cn("passport-layout-cover", `bg-cover-${num.random(4, 4)}`)} />
            <div className="flex flex-col layout-p bg-black/50 space-y-10 min-h-full">
              <div className="flex flex-col justify-center items-center flex-1 max-w-96 mx-auto space-y-2">
                <div className="relative bg-background backdrop-blur-sm transition-all rounded-3xl gap-5 p-6 max-w-xs w-full">
                  <div className="flex justify-center relative w-full">
                    <NavLink to="/">
                      <Button
                        className="text-gray-500 hover:text-primary absolute top-3 left-0"
                        variant="none"
                        size="none"
                      >
                        <Icon path={ArrowLeft} size={6} />
                      </Button>
                    </NavLink>
                    <AppLayoutLogo badge="ID" />
                  </div>
                  <Outlet />
                </div>
                <p className="text-white text-center">
                  <span className="text-md font-bold">tasksID</span>
                  <span className="text-sm"> — ключ от сервиса</span>
                </p>
              </div>
              <div className="flex flex-col flex-reverse sm:flex-row justify-between gap-2">
                <p className="text-white text-center text-xs">©2025 - сервис задач</p>
                <p className="text-white text-center text-xs">
                  Используйте режим инкогнито на чужом компьютере
                </p>
              </div>
            </div>
          </div>
        )
      }
    </AppPassportLoader>
  );
});
