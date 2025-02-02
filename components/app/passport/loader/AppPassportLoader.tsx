/** 1 Node - Modules, Components, Hooks, Icons */
import React from "react";
import { Loader } from "lucide-react";
import { observer } from "mobx-react-lite";

/** 2 App - Components, Hooks */
import { LoaderPlaceholder } from "@/components/shared/loader/placeholder/LoaderPlaceholder";
import { Icon } from "@/components/shared/icon/Icon";
import { PASSPORT_STATUS } from "@/types/passport.d";

/** 3 Entities, Stores, Packages, Enums ... */
import { ACTION_MESSAGES } from "@/enums/action/messages";
import { PassportStore } from "@/stores/PassportStore";

export type AppSessionPassportLoaderChildrenProp =
  | React.ReactNode
  | ((
      authorized: boolean
    ) =>
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | null
      | React.ReactNode);

/**
 * @interface AppSessionPassportLoaderProps
 */
interface AppSessionPassportLoaderProps {
  children: AppSessionPassportLoaderChildrenProp;
  animation?: React.ReactElement | null;
  as?: React.ElementType;
}

/**
 * Компонент, позволяющий рендерить дочерние элементы только для авторизованных пользователей.
 *
 * @param {React.ReactElement} animation Позволяет указать, могут ли гости иметь доступ к дочерним элементам.
 * @param {React.ReactNode} children Дочерние элементы, которые будут отображаться, если пользователь авторизован.
 *
 * @return {React.ReactElement} Сформированные DOM узлы.
 */
export const AppPassportLoader: React.FC<AppSessionPassportLoaderProps> = observer(
  ({ children, animation = null, as: As = React.Fragment }): React.ReactElement => {
    if (PassportStore.status === PASSPORT_STATUS.LOADING) {
      return animation ? (
        <As>{animation}</As>
      ) : (
        <LoaderPlaceholder description={ACTION_MESSAGES.LOADING_SESSION} square>
          <Icon path={Loader} size={7} variant="spinner" />
        </LoaderPlaceholder>
      );
    }

    return (
      <>{typeof children === "function" ? children(PassportStore.isAuthenticated()) : children}</>
    );
  }
);
