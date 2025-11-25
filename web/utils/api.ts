import type { Response } from "~/types/models";
import { useUserStore } from "~/store/user";
import { useToast } from "#imports";

export const postRequest = async <T>(url: string, body: object | FormData, options?: { credentials?: RequestCredentials }) => {
    const BASE_API = useRuntimeConfig().public.baseApi;
    const userStore = useUserStore();
    const token = userStore.token || "null";

    try {
        const isFormData = body instanceof FormData;
        const headers = isFormData 
        ? { 'Authorization': `${token}` }
        : { 
            'Content-Type': 'application/json',
            'Authorization': `${token}`
          };

        const response: Response<T> = await $fetch(`${BASE_API}/${url}`, {
            method: 'POST',
            headers,
            body: isFormData ? body : JSON.stringify(body),
            credentials: options?.credentials
        });

        return response;
    } catch (error) {
        console.error('请求失败:', error);
        throw error;
    }
};

export const getRequest = async <T>(url: string, params?: any, options?: { credentials?: RequestCredentials }) => {
    const BASE_API = useRuntimeConfig().public.baseApi;
    const userStore = useUserStore();
    const token = userStore.token || "null";

    try {
        const queryParamString = params ? "?" + Object.keys(params).map(key => key + "=" + params[key]).join("&") : "";
        
        const response: Response<T> = await $fetch(`${BASE_API}/${url}${queryParamString}`, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`,
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
            },
            credentials: options?.credentials
        });

        return response;
    } catch (error) {
        const e: any = error;
        const status = e?.response?.status || e?.status;
        if (status === 401) {
            return { code: 0, msg: 'Unauthorized' } as any as Response<T>;
        }
        console.error('请求失败:', error);
        throw error;
    }
};

export const putRequest = async <T>(url: string, body: object, options?: { credentials?: RequestCredentials }) => {
    const BASE_API = useRuntimeConfig().public.baseApi;
    const toast = useToast();
    const userStore = useUserStore();
    const token = userStore.token || "null";

    try {
        const response: Response<T> = await $fetch(`${BASE_API}/${url}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
            body: JSON.stringify(body),
            credentials: options?.credentials
        });

        if (response.code !== 1) {
            toast.add({
                title: "请求失败",
                description: response.msg,
                icon: "i-fluent-error-circle-16-filled",
                color: "red",
                timeout: 2000,
            });
            return null;
        }

        return response;
    } catch (error) {
        console.error('请求失败:', error);
        throw error;
    }
};

export const deleteRequest = async <T>(url: string, params?: any, options?: { credentials?: RequestCredentials }) => {
    const BASE_API = useRuntimeConfig().public.baseApi;
    const userStore = useUserStore();
    const token = userStore.token || "null";

    try {
        const queryParamString = params ? "?" + Object.keys(params).map(key => key + "=" + params[key]).join("&") : "";
        
        const response: Response<T> = await $fetch(`${BASE_API}/${url}${queryParamString}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `${token}`,
            },
            credentials: options?.credentials
        });

        return response;
    } catch (error) {
        console.error('请求失败:', error);
        throw error;
    }
};
