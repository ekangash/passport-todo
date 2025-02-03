/** 1 Node - Modules, Components, Hooks, Icons */
import React, { useEffect } from "react";

/** 2 App - Components, Hooks */
import { AppExceptionHandler } from "@/components/app/exception/AppExceptionHandler";

/** 3 Entities, Stores, Packages, Enums ... */
import { PassportStore } from "@/stores/PassportStore";

/**
 * @returns {React.FC} Сформированные DOM узлы.
 */
export const AppPassportInitSession: React.FC = (): null => {
  useEffect((): void => {
    (async () => {
      try {
        await PassportStore.initSession();
      } catch (exception) {
        new AppExceptionHandler().handle(exception);
      }
    })();
  }, []);

  return null;
};
