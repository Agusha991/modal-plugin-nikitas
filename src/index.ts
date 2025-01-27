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
                console.log('Closing modal', id);
                modalStore.closeModal(id); // Закрытие модалки через Pinia
            },
        };

        // Найдем элемент с классом container
        const modalContainer = document.createElement('div');
        document.body.appendChild(modalContainer);

// Найдите или создайте `div` с классом container
//         const container = document.querySelector('.container');
//         if (container) {
//             container.appendChild(modalContainer);
//         } else {
//             console.error('Container with class "container" not found');
//         }
        // Реактивное обновление модалок через watch
        watch(
            () => modalStore.modals,
            (newModals) => {
                console.log('Modals updated in watch:', newModals);

                // Очищаем контейнер
                modalContainer.innerHTML = '';

                // Добавляем модалки в DOM
                newModals.forEach((modal) => {
                    console.log('Rendering modal:', modal);
                    const modalApp = createApp({
                        render() {
                            return h(Modal, {
                                options: modal.options,
                                onClose: () => modalStore.closeModal(modal.id),
                            });
                        },
                    });
                    modalApp.mount(modalContainer);
                });
            },
            {deep: true}
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
