import {App, createApp, h} from 'vue';
import { createPinia, Pinia } from 'pinia';
import { useModalStore } from './store/modal'; // Import the store
import Modal from './components/Modal.vue';

export default {
    install(app: any) {
        // Check if Pinia is already installed
        if (!app._context.pinia) {
            const pinia = createPinia();
            app.use(pinia);
        }

        const modalStore = useModalStore();

        console.log('Plugin installation started');

        app.config.globalProperties.$modal = {
            open(name: string, options: Record<string, any> = {}) {
                modalStore.openModal(name, options); // Use Pinia store to open modal
                console.log('Current modals:', modalStore.modals);
            },
            close(id: number) {
                console.log('Closing modal', id);
                modalStore.closeModal(id); // Use Pinia store to close modal
            },
        };

        const modalContainer = document.createElement('div');
        document.body.appendChild(modalContainer);

        // Следим за изменениями в сторе и рендерим компонент
        modalStore.$subscribe(() => {
            const modal = modalStore.modals[modalStore.modals.length - 1]; // Берем последнее окно
            if (modal) {
                const modalApp = createApp({
                    render() {
                        return h(Modal, {
                            options: modal.options,
                            onClose: () => modalStore.closeModal(modal.id), // Закрытие модалки
                        });
                    },
                });

                modalApp.mount(modalContainer); // Монтируем компонент в контейнер
            }
        });

        app.component('NikitaModal', Modal); // Register modal component globally
    },
};

// TypeScript declaration to extend ComponentCustomProperties
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $modal: {
            open: (name: string, options?: Record<string, any>) => void;
            close: (id: number) => void;
        };
    }
}
