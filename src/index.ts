import { App, inject, InjectionKey, reactive } from 'vue';

interface ModalState {
    open: (name: string, options?: Record<string, any>) => void;
    close: (id: number) => void;
}

const ModalSymbol: InjectionKey<ModalState> = Symbol('modal');

export default {
    install(app: App) {
        console.log('Installing Modal Plugin');

        const state = reactive<ModalState>({
            open: (name, options = {}) => {
                console.log(`Opening modal: ${name}`, options);
            },
            close: (id) => {
                console.log(`Closing modal: ${id}`);
            },
        });

        app.provide(ModalSymbol, state);

        console.log('Added $modal to globalProperties');
    },
};