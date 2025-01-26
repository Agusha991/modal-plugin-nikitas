import { App } from 'vue';
import Modal from './components/Modal.vue';

export default {
    install(app: App) {
        console.log('Installing Modal Plugin'); // Debugging message
        app.config.globalProperties.$modal = {
            open(name: string, options: Record<string, any> = {}) {
                console.log(`Opening modal: ${name}`, options);
            },
            close(id: number) {
                console.log(`Closing modal: ${id}`);
            },
        };
        console.log('Added $modal to globalProperties');
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
