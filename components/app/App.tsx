/** 1 Node - Modules, Components, Hooks, Icons */
import React from "react";

/** 2 App - Components, Hooks */
import { ThemeProvider } from "@/components/app/theme/provider/AppThemeProvider";
import { AppRouters } from "@/components/app/routers/AppRouters";
import { AppToaster } from "@/components/app/toaster/AppToaster";
import {AppPassportInitSession} from "@/components/app/passport/init-session/AppPassportInitSession.tsx";

/** 3 Entities, Stores, Packages, Enums ... */
import "@/components/app/App.scss";

/**
 * @return {React.ReactElement} Сформированный DOM узел.
 */
export const App: React.FC = (): React.ReactElement => {
  return (
    <ThemeProvider>
        <AppPassportInitSession/>
        <AppRouters />
      <AppToaster />
    </ThemeProvider>
  );
};
