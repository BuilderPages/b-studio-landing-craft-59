
import { useState, useEffect } from "react";

type ToastType = "default" | "success" | "error" | "warning" | "info";

interface ToastOptions {
  title?: string;
  description?: string;
  variant?: ToastType;
  duration?: number;
}

interface Toast extends ToastOptions {
  id: string;
  visible: boolean;
}

const toastTimeouts = new Map<string, NodeJS.Timeout>();

export function toast(options: ToastOptions) {
  const id = Math.random().toString(36).substr(2, 9);
  const event = new CustomEvent("toast", {
    detail: {
      ...options,
      id,
    },
  });
  window.dispatchEvent(event);
  return id;
}

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: ToastOptions) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = {
      ...toast,
      id,
      visible: true,
    };

    setToasts((prev) => [...prev, newToast]);

    if (toast.duration !== Infinity) {
      const timeout = setTimeout(() => {
        dismissToast(id);
      }, toast.duration || 5000);

      toastTimeouts.set(id, timeout);
    }

    return id;
  };

  const dismissToast = (id: string) => {
    setToasts((prevToasts) =>
      prevToasts.map((toast) =>
        toast.id === id ? { ...toast, visible: false } : toast
      )
    );

    const timeout = setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, 300);

    return () => clearTimeout(timeout);
  };

  useEffect(() => {
    const handleToast = (event: Event) => {
      const { detail } = event as CustomEvent<ToastOptions & { id: string }>;
      addToast(detail);
    };

    window.addEventListener("toast", handleToast);
    return () => {
      window.removeEventListener("toast", handleToast);
      toastTimeouts.forEach((timeout) => clearTimeout(timeout));
      toastTimeouts.clear();
    };
  }, []);

  return {
    toast: addToast,
    toasts,
    dismiss: dismissToast,
  };
};

export default useToast;
