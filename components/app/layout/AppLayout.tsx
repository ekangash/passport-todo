/** 1 Node - Modules, Components, Hooks, Icons */
import React from "react";
import { Outlet } from "react-router-dom";

/** 2 App - Components, Hooks */
import { AppLayoutHeader } from "@/components/app/layout/header/AppLayoutHeader";
import { AppPassportLoader } from "@/components/app/passport/loader/AppPassportLoader";
import { AppLayoutPassportUnauthenticated } from "@/components/app/layout/passport/unauthenticated/AppLayoutPassportUnauthenticated";

/** 3 Entities, Stores, Packages, Enums ... */

/**
 * @return {React.ReactElement} Сформированный DOM узел.
 */
export const AppLayout: React.FC = () => {
  return (
    <main className="h-screen flex flex-col justify-between">
      <AppLayoutHeader className="p-4 mx-auto sticky top-0 z-10 bg-card w-full" />
      <div className="max-w-3xl mx-auto w-full px-4 flex-1 pb-20">
        <AppPassportLoader>
          {(authorized: boolean): React.ReactElement => authorized ? <Outlet /> : <AppLayoutPassportUnauthenticated />}
        </AppPassportLoader>
      </div>
    </main>
  );
};
