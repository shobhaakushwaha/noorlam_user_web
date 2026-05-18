"use client";

import { Toaster } from "sonner";

const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      duration={3000}
      expand={true}
      visibleToasts={4}
    />
  );
};

export default ToastProvider;