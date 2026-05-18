'use client'
import { getToken, removeToken } from "./cookie";


export const isLoggedIn = () => {
    return !!getToken();
};

export const logout = () => {
    removeToken();
    if (typeof window !== "undefined") {
        window.location.href = "/login";
    }
};