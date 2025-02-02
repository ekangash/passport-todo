/** 1 Node - Modules, Components, Hooks, Icons */
import React, { useEffect } from "react";

/** 2 App - Components, Hooks */
/** 3 Entities, Stores, Packages, Enums ... */
import { PassportStore } from "@/stores/PassportStore";
import { PASSPORT_STATUS } from "@/types/passport.d";
import { AppExceptionHandler } from "@/components/app/exception/AppExceptionHandler";

/**
 * @returns {React.FC} Сформированные DOM узлы.
 */
export const AppPassportInitSession: React.FC = (): null => {
  useEffect((): void => {
    (async () => {
      try {
        if (location.origin !== "/passport") {
          await PassportStore.initSession();
        } else {
          PassportStore.setStatus(PASSPORT_STATUS.AUTHENTICATED);
        }
      } catch (exception) {
        new AppExceptionHandler().handle(exception);
      }
    })();
  }, []);

  return null;
};
