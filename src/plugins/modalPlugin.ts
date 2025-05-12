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

                // Добавляем модалки в DOM
                newModals.forEach((modal) => {
                    modalContainer.dataset.modalId = String(modal.id);

                    modalContainer.addEventListener("click", (event) => {
                        console.log("this click on background", modalStore.modals.length);

                        modalStore.closeModal(modal.id);

                        // Remove 'modal' class if only one modal was open (now it's 0)
                        if (modalStore.modals.length <= 1) {
                            modalContainer.classList.remove("modal");
                        }
                    });

                    modalContainer.setAttribute("name", modal.name);

                    // ✅ Only add class if there will be more than 1 modal after this one is mounted
                    if (modalStore.modals.length > 1) {
                        modalContainer.classList.add("modal");
                    } else {
                        modalContainer.classList.remove("modal");
                    }
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
            {deep: true}
        );
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
