import { createApp, h, ref, getCurrentInstance } from "vue";
import Toaster from "./components/Toaster/Toaster.vue";

interface ToastOptions {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  duration?: number;
}

interface Toast {
  id: number;
  type: "success" | "error" | "info" | "warning";
  message: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  duration: number;
}

export default {
  install(app: any) {
    const toasts = ref<Toast[]>([]);

    const addToast = (
      type: string,
      message: string,
      options: ToastOptions = {}
    ) => {
      const id = Date.now();
      const position = options.position || "top-right";
      const duration = options.duration || 5000;

      const toastData: Toast = { id, type, message, position, duration };
      toasts.value.push(toastData);

      setTimeout(() => {
        toasts.value = toasts.value.filter((toast) => toast.id !== id);
      }, duration);
    };

    app.config.globalProperties.$toast = {
      success: (message: string, options: ToastOptions = {}) =>
        addToast("success", message, options),
      error: (message: string, options: ToastOptions = {}) =>
        addToast("error", message, options),
      info: (message: string, options: ToastOptions = {}) =>
        addToast("info", message, options),
      warning: (message: string, options: ToastOptions = {}) =>
        addToast("warning", message, options),
    };

    const createContainer = (position: string) => {
      const container = document.createElement("div");
      container.classList.add("toast-container", `toast--${position}`);
      document.body.appendChild(container);
      return container;
    };

    const topRightContainer = createContainer("top-right");
    const bottomRightContainer = createContainer("bottom-right");
    const topLeftContainer = createContainer("top-left");
    const bottomLeftContainer = createContainer("bottom-left");

    const createAppInstance = (position: string, container: HTMLElement) => {
      createApp({
        setup() {
          return { toasts };
        },
        render() {
          return toasts.value
            .filter((t) => t.position === position)
            .map((toast, index) =>
              h(Toaster, { key: toast.id, index, ...toast })
            );
        },
      }).mount(container);
    };

    createAppInstance("top-right", topRightContainer);
    createAppInstance("bottom-right", bottomRightContainer);
    createAppInstance("top-left", topLeftContainer);
    createAppInstance("bottom-left", bottomLeftContainer);
  },
};

export function useToast() {
  const instance = getCurrentInstance();
  return instance?.appContext.config.globalProperties.$toast;
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $toast: {
      success: (message: string, options?: ToastOptions) => void;
      error: (message: string, options?: ToastOptions) => void;
      info: (message: string, options?: ToastOptions) => void;
      warning: (message: string, options?: ToastOptions) => void;
    };
  }
}
