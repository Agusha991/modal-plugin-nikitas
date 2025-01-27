import { App, createApp } from 'vue';
import { useModalStore } from './store/modal'; // Import the store
import Modal from './components/Modal.vue';

export default {
    install(app: App) {
        console.log('Plugin installation started');
        const modalStore = useModalStore(); // Use the modal store
        console.log('Modal Plugin Installed with Pinia store');
        app.config.globalProperties.$modal = {
            open(name: string, options: Record<string, any> = {}) {
                console.log('this call', name, options);
                modalStore.openModal(name, options); // Use Pinia store to open modal
                console.log('this call', modalStore.modals);
            },
            close(id: number) {
                modalStore.closeModal(id); // Use Pinia store to close modal
            },
        };

        app.component('nikitaModal', Modal); // Register modal component
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
