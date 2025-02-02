/** 1 Node - Modules, Components, Hooks, Icons */
import React from "react";

/** 2 App - Components, Hooks */
import { LoaderPlaceholder } from "@/components/shared/loader/placeholder/LoaderPlaceholder.js";

/** 3 Entities, Stores, Packages, Enums ... */
import { REQUEST_MESSAGES } from "@/enums//request/messages";

/**
 * Неизвестная страница
 *
 * @return {JSX.Element} DOM-элемент
 */
export const NotFoundPage: React.FC = (): React.ReactElement => {
  return (
    <LoaderPlaceholder description={REQUEST_MESSAGES.NOT_FOUND}>
      {REQUEST_MESSAGES.NOT_FOUND}
    </LoaderPlaceholder>
  );
};
