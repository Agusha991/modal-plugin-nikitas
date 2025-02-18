import { createApp, h } from "vue";
import { useModalStore } from "../store/modal";
import Modal from "../components/Modal/Modal.vue";
import { watch } from "vue";
import { IModalState } from "types";

export default {
  install(app: any) {
    const modalStore = useModalStore();

    // Добавление глобального метода $modal
    app.config.globalProperties.$modal = {
      open(name: string, options: IModalState) {
        modalStore.openModal(name, options); // Открытие модалки через Pinia
        console.log("Current modals:", modalStore.modals);
      },
      close(id: number) {
        modalStore.closeModal(id); // Закрытие модалки через Pinia
      },
    };

    // Найдем элемент с классом container
    const modalContainer = document.createElement("div");
    document.body.appendChild(modalContainer);

    // Реактивное обновление модалок через watch
    watch(
      () => modalStore.modals,
      (newModals) => {
        // Очищаем контейнер
        modalContainer.innerHTML = "";

        // Добавляем модалки в DOM
        newModals.forEach((modal) => {
          modalContainer.dataset.modalId = String(modal.id);

          modalContainer.addEventListener("click", (event) => {
            console.log(`Closing modal with id: ${modal.id}`);
            modalStore.closeModal(modal.id);
          });
          modalContainer.setAttribute("name", modal.name);
          modalContainer.classList.add("modal");
          modalContainer.addEventListener("click", () => {
            console.log("this click on background");
            modalStore.closeModal(modal.id);
          });

          const modalApp = createApp({
            render() {
              return h(Modal, {
                options: modal.options,
                name: modal.name,
                onClose: () => {
                  modalContainer.classList.remove("modal");
                  modalStore.closeModal(modal.id);
                },
              });
            },
          });
          modalApp.mount(modalContainer);
        });
      },
      { deep: true }
    );
  },
};

// Расширение глобального интерфейса для TypeScript
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $modal: {
      open: (name: string, options?: Record<string, any>) => void;
      close: (id: number) => void;
    };
  }
}
