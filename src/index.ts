import { App, ref } from 'vue';
import Modal from './components/Modal.vue';

export default {
    install(app: App) {
        // Register the Modal component globally
        app.component('Modal', Modal);

        console.log('agusha_nikita plugin initialized!');

        // Modal methods with Composition API
        const modals = ref<{ id: number; name: string; options: Record<string, any> }[]>([]);

        const modalMethods = {
            open(name: string, options: Record<string, any> = {}) {
                const id = Date.now();
                modals.value.push({ id, name, options });
                console.log(`Opening modal: ${name}`, options);
            },
            close(id: number) {
                const index = modals.value.findIndex((modal) => modal.id === id);
                if (index !== -1) {
                    modals.value.splice(index, 1);
                    console.log(`Closing modal: ${id}`);
                }
            },
        };

        // Make $modal globally accessible
        app.config.globalProperties.$modal = modalMethods;

        console.log('Modal plugin installed!');
    },
};

// TypeScript declaration for global properties
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $modal: {
            open: (name: string, options?: Record<string, any>) => void;
            close: (id: number) => void;
        };
    }
}
