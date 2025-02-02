/** 1 Node - Modules, Components, Hooks, Icons */
import React from 'react';
import {str} from "data-support";

/** 2 App - Components, Hooks */
/** 3 Entities, Stores, Packages, Enums ... */
import {cn} from "@/packages/utils";

/**
 * @interface StripProps
 */
interface StripProps {
    text?: string;
    className?: string;
}

/**
 * @return {React.ReactNode} Сформированные DOM узлы.
 */
export const Strip: React.FC<StripProps> = ({ text = '', className = '' }) => {

    return (
        <div className="relative">
            <hr className={cn('base-hr', className)}/>
            {str.contains(text) && (
                <div className="absolute -top-4 w-full flex justify-center">
                    <p className="bg-background py-1 px-3 text-sm text-center">
                        {text}
                    </p>
                </div>
            )}
        </div>

    );
};