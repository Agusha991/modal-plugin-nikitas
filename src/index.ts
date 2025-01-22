import { App } from 'vue';

export default {
    install(app: App) {
        // Define global `$modal` methods
        app.config.globalProperties.$modal = {
            open(name: string, options: Record<string, any>) {
                console.log(`Opening modal: ${name}`, options);
                // Add logic for opening a modal
            },
            close(name: string) {
                console.log(`Closing modal: ${name}`);
                // Add logic for closing a modal
            },
        };
    },
};
