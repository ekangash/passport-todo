"use client";
/** 1 Node - Modules, Components, Hooks, Icons */
import React, { useEffect, useState } from "react";
import { Loader as LoaderIcon } from "lucide-react";

/** 2 App - Components, Hooks */
import { LoaderPlaceholder } from "@/components/shared/loader/placeholder/LoaderPlaceholder";
import { AppExceptionHandler } from "@/components/app/exception/AppExceptionHandler";
import { Icon } from "@/components/shared/icon/Icon";

/** 3 Entities, Stores, Packages, Enums ... */
import { func } from "data-support";
import { ACTION_MESSAGES } from "@/enums/action/messages";

/**
 * @interface LoaderProps
 */
interface LoaderProps {
  children: (value: any) => JSX.Element;
  expect: ({ setLoading }) => Promise<any>;
  initWhenDidMount?: boolean;
  animation?: React.ReactElement;
  fillExceptionEvents?: object;
  filled?: boolean;
  await?: boolean; // Лаудер ожидает выполнения пока этот флаг не станет тру
  oblong?: boolean;
  deps?: any[];
  className?: string;
}

/**
 * Загрузчик
 *
 * @return {React.ReactElement} Компонент вкладки Характеристики
 */
export const Loader: React.FC<LoaderProps> = ({
  children,
  expect,
  fillExceptionEvents = {},
  animation = null,
  initWhenDidMount = true,
  filled = true,
  oblong = false,
  deps = [],
}): React.ReactElement => {
  const [loading, setLoading] = useState(initWhenDidMount);
  const [childrenNodes, setChildrenNodes] = useState<React.ReactNode>(null);

  useEffect(() => {
    const executeExpectFn = async (): Promise<void> => {
      if (initWhenDidMount && func.assert(expect)) {
        try {
          const expectProps = await expect({ setLoading });
          setChildrenNodes(children(expectProps));
        } catch (exception) {
          const content = new AppExceptionHandler()
            .fillEvents(fillExceptionEvents)
            .handle(exception);

          setChildrenNodes(
            content ?? (
              <LoaderPlaceholder
                description={ACTION_MESSAGES.TRY_AGAIN}
                filled={filled}
                oblong={oblong}
              >
                {ACTION_MESSAGES.UNEXPECTED_ERR}
              </LoaderPlaceholder>
            )
          );
        }
      } else {
        setChildrenNodes(children(null));
      }

      setLoading(false);
    };

    executeExpectFn();
  }, deps);

  if (loading) {
    return (
      animation ?? (
        <LoaderPlaceholder description={ACTION_MESSAGES.LOADING} filled={filled} oblong={oblong}>
          <Icon path={LoaderIcon} size={7} variant="spinner" />
        </LoaderPlaceholder>
      )
    );
  }

  return <>{childrenNodes}</>;
};
