import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', {
    state: () => ({
        modals: [] as Array<{ id: number; name: string; options: Record<string, any> }>,
    }),
    actions: {
        openModal(name: string, options: Record<string, any> = {}) {
            this.modals.push({
                id: Date.now(),
                name,
                options,
            });
            console.log('Modal added:', this.modals);
        },
        closeModal(id: number) {
            this.modals = this.modals.filter((modal) => modal.id !== id);
            console.log('Modal removed:', this.modals);
        },
    },
});
