import { App, ref } from 'vue';
import Modal from './components/Modal.vue';

export default {
    install(app: App) {
        app.component('Modal', Modal);

        const modalMethods = {
            open({name, options}: {name: string, options: object}) {
                console.log(`Opening modal: ${name}`, options);
                // Your modal opening logic here
            },
            close(id: number) {
                console.log(`Closing modal: ${id}`);
                // Your modal closing logic here
            },
        };
        // Make $modal globally accessible
        app.config.globalProperties.$modal = modalMethods;
    },
};
