<template>
  <div class="modal" v-for="(modal, index) in modalStore.modals" :key="index">
    <div class="modal-content">
      <div>{{modal.name}}</div>
      <div>{{modal.options}}</div>
      <slot></slot>
      <button @click="close">Close</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useModalStore} from "@/store/modal";

defineOptions({
  name: 'Modal',
})
const modalStore = useModalStore();
console.log(modalStore.modals)
const handleOutsideClick = (e: MouseEvent) => {
  const modalElement = (e.target as HTMLElement).closest('.modal');
  if (!modalElement) {
    modalStore.closeModal(0); // Pass the modal ID that should be closed
  }
};

const visible = ref(false);

const close = () => {
  visible.value = false;
};

</script>

<style scoped lang="scss">
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
