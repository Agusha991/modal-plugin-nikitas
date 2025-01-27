<template>
  <teleport to="body">
    <div class="modal">
      <div class="modal-content">
        <div>{{ modalStore.modals }}</div>
        <div>some text</div>
<!--        <slot/>-->
        <button @click="close">Close</button>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
//  type ModalStore = {
//   modals: { id: number; name: string; options: Record<string, any> }[];
//   openModal: (name: string, options?: Record<string, any>) => void;
//   closeModal: (id: number) => void;
// };
import {onMounted, ref} from "vue";
import {useModalStore} from "@/store/modal";

defineOptions({
  name: 'Modal',
})
 const modalStore = useModalStore(); // Directly call the store

 // const modalStore = ref<ModalStore>({} as ModalStore); // modalStore can be null initially

console.log('check store in component', modalStore)

const handleOutsideClick = (e: MouseEvent) => {
  const modalElement = (e.target as HTMLElement).closest('.modal');
  if (!modalElement) {
    modalStore?.closeModal(0); // Pass the modal ID that should be closed
  }
};

const visible = ref(false);

const close = () => {
  visible.value = false;
};

</script>

<style lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
}
</style>
