import { App, createApp } from 'vue';
import { useModalStore } from './store/modal'; // Import the store
import Modal from './components/Modal.vue';

export default {
    install(app: App) {
        const modalStore = useModalStore(); // Use the modal store

        app.config.globalProperties.$modal = {
            open(name: string, options: Record<string, any> = {}) {
                modalStore.openModal(name, options); // Use Pinia store to open modal
            },
            close(id: number) {
                modalStore.closeModal(id); // Use Pinia store to close modal
            },
        };

        app.component('GlobalModal', Modal); // Register modal component
        console.log('Modal Plugin Installed with Pinia store');
    },
};

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $modal: {
            open: (name: string, options?: Record<string, any>) => void;
            close: (id: number) => void;
        };
    }
}
