import { App } from 'vue';



const nikitaModal = {
    install(app: App) {
        console.log('Installing nikitaModal plugin...');
        app.config.globalProperties.$modal = {
            open(name: string, options = {}) {
                console.log(`Modal ${name} opened`, options);
            },
            close(name: string) {
                console.log(`Modal ${name} closed`);
            },
        };
    },
};

export default nikitaModal;
