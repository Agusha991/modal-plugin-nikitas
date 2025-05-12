import {createApp, h, getCurrentInstance} from "vue";
import {useModalStore} from "../store/modal";
import Modal from "../components/Modal/Modal.vue";
import {watch} from "vue";
import {IModalState} from "types";

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

                // Обновляем data-атрибут и класс
                if (newModals.length > 1) {
                    modalContainer.classList.add("modal");
                } else {
                    modalContainer.classList.remove("modal");
                }

                // Добавляем модалки в DOM
                newModals.forEach((modal) => {
                    modalContainer.dataset.modalId = String(modal.id);
                    modalContainer.setAttribute("name", modal.name);

                    const modalApp = createApp({
                        render() {
                            return h(Modal, {
                                options: modal.options,
                                name: modal.name,
                                onClose: () => {
                                    modalStore.closeModal(modal.id);
                                },
                            });
                        },
                    });

                    modalApp.mount(modalContainer);
                });
            },
            {deep: true}
        );

// ✅ Добавляем ОДИН обработчик клика по фону
        modalContainer.addEventListener("click", (event) => {
            console.log("click on background", modalStore.modals.length);

            if (modalStore.modals.length > 0) {
                const lastModal = modalStore.modals[modalStore.modals.length - 1];
                modalStore.closeModal(lastModal.id);

                // Удаляем класс, если это была последняя модалка
                if (modalStore.modals.length <= 1) {
                    modalContainer.classList.remove("modal");
                }
            }
        });

    },
};

export function useModal() {
    const instance = getCurrentInstance();
    return instance?.appContext.config.globalProperties.$modal;
}

// Расширение глобального интерфейса для TypeScript
declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $modal: {
            open: (name: string, options?: IModalState) => void;
            close: (id: number) => void;
        };
    }
}
