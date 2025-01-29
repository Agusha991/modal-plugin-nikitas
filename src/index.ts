import {createApp, h} from 'vue';
import {createPinia} from 'pinia';
import {useModalStore} from './store/modal';
import Modal from './components/Modal.vue';
import {watch} from 'vue';

export default {
    install(app: any) {
        // Установка Pinia, если еще не установлена
        if (!app._context.pinia) {
            const pinia = createPinia();
            app.use(pinia);
        }

        const modalStore = useModalStore();

        console.log('Plugin installation started');
        // Добавление глобального метода $modal
        app.config.globalProperties.$modal = {
            open(name: string, options: Record<string, any> = {}) {
                modalStore.openModal(name, options); // Открытие модалки через Pinia
                console.log('Current modals:', modalStore.modals);
            },
            close(id: number) {
                modalStore.closeModal(id); // Закрытие модалки через Pinia
            },
        };

        // Найдем элемент с классом container
        const modalContainer = document.createElement('div');
        document.body.appendChild(modalContainer);
        modalContainer.classList.add('modal')
        modalContainer.textContent = `
            .modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
            }
        `;

        // Реактивное обновление модалок через watch
        watch(
            () => modalStore.modals,
            (newModals) => {
                // Очищаем контейнер
                modalContainer.innerHTML = '';

                // Добавляем модалки в DOM
                newModals.forEach((modal) => {
                    modalContainer.setAttribute('name', modal.name)
                    const modalApp = createApp({
                        render() {
                            return h(Modal, {
                                options: modal.options,
                                onClose: () => {
                                    modalStore.closeModal(modal.id)
                                }
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

// Расширение глобального интерфейса для TypeScript
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $modal: {
            open: (name: string, options?: Record<string, any>) => void;
            close: (id: number) => void;
        };
    }
}
