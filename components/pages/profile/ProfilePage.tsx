/** 1 Node - Modules, Components, Hooks, Icons */
import React from "react";
import { cn } from "@/packages/utils.ts";
import { observer } from "mobx-react-lite";
import { Caption } from "@/components/shared/caption/Caption.tsx";
import { PassportStore } from "@/stores/PassportStore.ts";
import { obj } from "data-support";

/** 2 App - Components, Hooks */
/** 3 Entities, Stores, Packages, Enums ... */

/**
 * Страница профиля.
 *
 * @return {JSX.Element} DOM-элемент
 */
export const ProfilePage: React.FC = observer((): React.ReactElement => {
  return (
    <div
      className={cn(
        "bg-secondary p-4 text-center w-full flex flex-col items-center justify-center rounded-2xl lg:rounded-3xl xl:rounded-[2rem]"
      )}
    >
      <Caption description={obj.get(PassportStore.session, "email")}>
        {obj.get(PassportStore.session, "fullname")}
      </Caption>
    </div>
  );
});
