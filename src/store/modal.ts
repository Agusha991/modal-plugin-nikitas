// store/modal.ts (внутри плагина)
import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', {
    state: () => ({
        modals: [] as Array<{ id: number; name: string; options: Record<string, any> }>,
    }),
    actions: {
        openModal(name: string, options: Record<string, any> = {}) {
            const id = Date.now();
            this.modals.push({ id, name, options }); // Добавляем новую модалку
            console.log(this.modals, 'store')
        },
        closeModal(id: number) {
            this.modals = this.modals.filter((modal) => modal.id !== id); // Закрываем модалку по ID
        },
    },
});
