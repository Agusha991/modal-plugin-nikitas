import { App } from 'vue';
import Modal from './components/Modal.vue';

export default {
    install(app: App) {
        // Register the Modal component globally
        app.component('Modal', Modal);

        // Add the $modal method to globalProperties
        const modalMethods = {
            open(name: string, options: Record<string, any> = {}) {
                console.log(`Opening modal: ${name}`, options);
            },
            close(id: number) {
                console.log(`Closing modal: ${id}`);
            },
        };

        app.config.globalProperties.$modal = modalMethods;
        console.log('modalMethods added to globalProperties');
    },
};

// TypeScript augmentation for globalProperties
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $modal: {
            open: (name: string, options?: Record<string, any>) => void;
            close: (id: number) => void;
        };
    }
}
