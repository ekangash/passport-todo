/** 1 Node - Modules, Components, Hooks, Icons */
import React from 'react';

/** 2 App - Components, Hooks */
import {Caption} from "@/components/shared/caption/Caption";
import {Tasks} from "@/components/entities/tasks/Tasks";

/** 3 Entities, Stores, Packages, Enums ... */

/**
 * Главная страница.
 *
 * @returns {JSX.Element} DOM-элемент
 */
export const HomePage: React.FC = (): React.ReactElement => {
    return (
        <>
            <Caption description="Организуйте свои данные" className="mb-8">
                Список задач
            </Caption>
            <Tasks />
        </>
    );
};