/** 1 Node - Modules, Components, Hooks, Icons */
import React from "react";

/** 2 App - Components, Hooks */
/** 3 Entities, Stores, Packages, Enums ... */
import "@app/routers/fallback/AppRoutersFallback.scss";

/**
 * Лоадер для ожидания получения динамических импортов
 *
 * @return {JSX.Element} DOM-элемент
 */
export const AppRoutersFallback = () => {
  return <div className="fallback-loader" />;
};
