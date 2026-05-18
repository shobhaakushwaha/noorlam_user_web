"use client";

import { toast } from "sonner";

export const showToast = {
    success: (id, message = 'successfully', description = "") =>
        toast.success(message, {
            id,
            description,
            duration: 3000,
        }),

    error: (id, message, description = "") =>
        toast.error(message, {
            id,
            description,
            duration: 4000,
        }),

    warning: (id, message, description = "") =>
        toast.warning(message, {
            id,
            description,
            duration: 3500,
        }),

    info: (id, message, description = "") =>
        toast(message, {
            id,
            description,
            duration: 3000,
        }),

    loading: (id, message = "Please wait...") =>
        toast.loading(message, {
            id,
        }),

    dismiss: (id) => toast.dismiss(id),

    promise: (id, promise, messages) =>
        toast.promise(promise, {
            id,
            loading: messages.loading || "Loading...",
            success: messages.success || "Success",
            error: messages.error || "Something went wrong",
        }),
};