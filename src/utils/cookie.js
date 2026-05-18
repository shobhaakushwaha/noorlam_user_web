// import Cookies from "js-cookie";

// const COOKIE_NAME =
//     process.env.NEXT_PUBLIC_TOKEN_COOKIE_NAME || "noorlambaba_token";

// const EXPIRE_DAYS = Number(
//     process.env.NEXT_PUBLIC_TOKEN_EXPIRE_DAYS || 7
// );

// // ✅ Token Set
// export const setToken = (token) => {
//     Cookies.set(COOKIE_NAME, JSON.stringify(token), {
//         expires: EXPIRE_DAYS, // Expiry from .env
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "Strict",
//     });
// };
// export const getToken = () => Cookies.get(JSON.parse(COOKIE_NAME)) || null;

// export const removeToken = () => Cookies.remove(COOKIE_NAME);


// import Cookies from "js-cookie";

// const COOKIE_NAME =
//     process.env.NEXT_PUBLIC_TOKEN_COOKIE_NAME ||
//     "noorlambaba_token";

// const EXPIRE_DAYS = Number(
//     process.env.NEXT_PUBLIC_TOKEN_EXPIRE_DAYS || 7
// );

// /* ---------------- SET TOKEN ---------------- */
// export const setToken = (token) => {
//     Cookies.set(
//         COOKIE_NAME,
//         JSON.stringify(token), // save as JSON string
//         {
//             expires: EXPIRE_DAYS,
//             secure: process.env.NODE_ENV === "production",
//             sameSite: "Strict",
//         }
//     );
// };

// /* ---------------- GET TOKEN ---------------- */
// export const getToken = () => {
//     const token = Cookies.get(COOKIE_NAME);

//     if (!token) return null;

//     try {
//         return JSON.parse(token); // auto clean parse
//     } catch (error) {
//         return token; // fallback normal string
//     }
// };

// /* ---------------- REMOVE TOKEN ---------------- */
// export const removeToken = () => {
//     Cookies.remove(COOKIE_NAME);
// };


"use client";

import Cookies from "js-cookie";

const COOKIE_NAME =
    process.env.NEXT_PUBLIC_TOKEN_COOKIE_NAME ||
    "noorlambaba_token";

const EXPIRE_DAYS = Number(
    process.env.NEXT_PUBLIC_TOKEN_EXPIRE_DAYS || 7
);

/* ---------------- SET TOKEN ---------------- */
export const setToken = (token) => {
    Cookies.set(
        COOKIE_NAME,
        JSON.stringify(token),
        {
            expires: EXPIRE_DAYS,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
        }
    );
};

/* ---------------- GET TOKEN ---------------- */
export const getToken = () => {
    const token = Cookies.get(COOKIE_NAME);

    if (!token) return null;

    try {
        return JSON.parse(token);
    } catch {
        return token;
    }
};

/* ---------------- CHECK LOGIN ---------------- */
export const isLogin = () => {
    return !!getToken();
};

/* ---------------- REMOVE TOKEN ---------------- */
export const removeToken = () => {
    Cookies.remove(COOKIE_NAME);
};

/* ---------------- FULL LOGOUT ---------------- */
export const logoutUser = () => {
    removeToken();
};