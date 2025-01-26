import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', {
    state: () => ({
        modals: [] as { id: number; name: string; options: Record<string, any> }[],
    }),
    actions: {
        openModal(name: string, options: Record<string, any> = {}) {
            const id = Date.now(); // Generate unique modal ID
            this.modals.push({ id, name, options });
            console.log(`Opening modal: ${name}`, options);
            console.log(this.modals)
        },
        closeModal(id: number) {
            const index = this.modals.findIndex((modal) => modal.id === id);
            if (index !== -1) {
                this.modals.splice(index, 1);
                console.log(`Closing modal: ${id}`);
            }
        },
    },
});
