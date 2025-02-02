/** 1 Node - Modules, Components, Hooks, Icons */
import axiosDefault, {AxiosInstance} from "axios";

/** 2 App - Components, Hooks */
/** 3 Entities, Stores, Packages, Enums ... */
import {str} from "data-support";

/**
 * Формирует экземпляр 'axios'.
 *
 * @param {string|null} bearerAuthToken
 *
 * @return {AxiosInstance} Сформированный 'axios'.
 */
export const axios = {
    create: (accessToken: string|null = null): AxiosInstance => {

        const axiosClientInstance: AxiosInstance = axiosDefault.create({ baseURL: '/' });

        axiosClientInstance.interceptors.request.use((config) => {
            if (str.contains(accessToken) && config.headers) {
                config.headers['Authorization'] = `Bearer ${accessToken}`;
            }

            return config;
        },(error) => Promise.reject(error));

        return axiosClientInstance;
    }
};
