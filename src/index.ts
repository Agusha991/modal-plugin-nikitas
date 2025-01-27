import { App } from 'vue';
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
