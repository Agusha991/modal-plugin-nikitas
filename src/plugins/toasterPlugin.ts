import { createApp, h, ref, getCurrentInstance } from "vue";
import Toaster from "./Toaster.vue";

interface ToastOptions {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  duration?: number;
  dismissible?: boolean;
  pauseOnHover?: boolean;
}

interface Toast {
  id: number;
  type: "success" | "error" | "info" | "warning";
  message: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  duration: number;
  dismissible: boolean;
  pauseOnHover: boolean;
  height?: number;
}

interface ToastPosition {
  toasts: Toast[];
  totalHeight: number;
}

export default {
  install(app: any) {
    const toasts = ref<Toast[]>([]);
    const toastPositions = ref<Record<string, ToastPosition>>({
      "top-right": { toasts: [], totalHeight: 0 },
      "top-left": { toasts: [], totalHeight: 0 },
      "bottom-right": { toasts: [], totalHeight: 0 },
      "bottom-left": { toasts: [], totalHeight: 0 },
    });

    const calculatePosition = (toast: Toast, index: number): number => {
      const position = toast.position;
      const positionData = toastPositions.value[position];
      const gap = 10;
      let offset = 20;

      for (let i = 0; i < index; i++) {
        const prevToast = positionData.toasts[i];
        offset += (prevToast.height || 0) + gap;
      }

      return offset;
    };

    const updateToastHeight = (id: number, height: number) => {
      const toast = toasts.value.find((t) => t.id === id);
      if (toast) {
        toast.height = height;
        const position = toast.position;
        const positionData = toastPositions.value[position];
        positionData.totalHeight = positionData.toasts.reduce(
          (total, t) => total + (t.height || 0) + 10,
          20
        );
      }
    };

    const addToast = (
      type: string,
      message: string,
      options: ToastOptions = {}
    ) => {
      const id = Date.now();
      const position = options.position || "top-right";
      const duration = options.duration || 5000;
      const dismissible =
        options.dismissible !== undefined ? options.dismissible : true;
      const pauseOnHover =
        options.pauseOnHover !== undefined ? options.pauseOnHover : true;

      const toastData: Toast = {
        id,
        type,
        message,
        position,
        duration,
        dismissible,
        pauseOnHover,
      };

      toasts.value = [...toasts.value, toastData];
      toastPositions.value[position].toasts.push(toastData);
    };

    const removeToast = (id: number) => {
      const toast = toasts.value.find((t) => t.id === id);
      if (toast) {
        const position = toast.position;
        toastPositions.value[position].toasts = toastPositions.value[
          position
        ].toasts.filter((t) => t.id !== id);

        toastPositions.value[position].totalHeight = toastPositions.value[
          position
        ].toasts.reduce((total, t) => total + (t.height || 0) + 10, 20);
      }
      toasts.value = toasts.value.filter((t) => t.id !== id);
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
          return { toasts, toastPositions };
        },
        render() {
          const positionToasts = toastPositions.value[position].toasts;

          return positionToasts.map((toast, index) => {
            const offset = calculatePosition(toast, index);

            return h(Toaster, {
              key: toast.id,
              ...toast,
              style: {
                position: "fixed",
                [position.includes("top") ? "top" : "bottom"]: `${offset}px`,
                [position.includes("right") ? "right" : "left"]: "20px",
                transition: "all 0.3s ease",
              },
              onDismiss: () => removeToast(toast.id),
              onHeightUpdate: (height: number) =>
                updateToastHeight(toast.id, height),
            });
          });
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
