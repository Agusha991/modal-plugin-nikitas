import { createApp, h } from 'vue';
import { createPinia } from 'pinia';
import { useModalStore } from './store/modal';
import Modal from './components/Modal.vue';
import { watch } from 'vue';

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
                console.log('Closing modal', id);
                modalStore.closeModal(id); // Закрытие модалки через Pinia
            },
        };

        // Найдем элемент с классом container
        const container = document.querySelector('.container');
        if (!container) {
            console.error('Container with class "container" not found in DOM!');
            return;
        }

        const modalContainer = document.createElement('div');
        modalContainer.id = 'modal-container';
        container.appendChild(modalContainer);

        // Реактивное обновление модалок через watch
        watch(
            () => modalStore.modals,
            (newModals) => {
                console.log('Updated modals:', newModals);

                // Удаляем предыдущие модалки
                modalContainer.innerHTML = '';

                // Для каждой модалки создаем отдельное приложение
                newModals.forEach((modal) => {
                    const modalApp = createApp({
                        render() {
                            return h(Modal, {
                                options: modal.options,
                                onClose: () => modalStore.closeModal(modal.id),
                            });
                        },
                    });
                    modalApp.mount(modalContainer); // Монтируем модалку
                });
            },
            { deep: true } // Глубокое отслеживание изменений
        );

        console.log('Plugin installed successfully');
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
