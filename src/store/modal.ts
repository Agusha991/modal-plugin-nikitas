import { defineStore } from 'pinia';
import {IModalState} from "@/types";

export const useModalStore = defineStore('modal', {
    state: () => ({
        modals: [] as Array<{ id: number; name: string; options: IModalState }>,
    }),
    actions: {
        openModal(name: string, options: IModalState) {
            this.modals.push({
                id: Date.now(),
                name,
                options,
            });
            console.log('Modal added:', this.modals);
        },
        closeModal(id: number) {
            console.log('Modal removed:', this.modals);
            this.modals = this.modals.filter((modal) => modal.id !== id);
        },
    },
});
