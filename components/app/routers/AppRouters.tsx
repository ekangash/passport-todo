/** 1 Node - Modules, Components, Hooks, Icons */
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

/** 2 App - Components, Hooks */
import { HomePage } from "@/components/pages/HomePage";
import { NotFoundPage } from "@/components/pages/not-found/NotFoundPage";
import { AppLayout } from "@/components/app/layout/AppLayout";
import { PassportLayout } from "@/components/entities/passport/layout/PassportLayout";
import { ProfilePage } from "@/components/pages/profile/ProfilePage";
import { PassportRegisterPage } from "@/components/pages/passport/register/PassportRegisterPage";
import { PassportLoginPage } from "@/components/pages/passport/login/PassportLoginPage";

/** 3 Entities, Stores, Packages, Enums ... */

/**
 * Маршрутизация приложения
 *
 * @returns {JSX.Element} DOM-элемент
 */
export const AppRouters: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/*"} element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path={"profile"} element={<ProfilePage />} />
        </Route>
        <Route path={"/passport/*"} element={<PassportLayout />}>
          <Route path="*" element={<NotFoundPage />} />
          <Route path={"register"} element={<PassportRegisterPage />} />
          <Route path={"login"} element={<PassportLoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
