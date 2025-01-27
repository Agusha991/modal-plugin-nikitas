<template>
  <teleport to="body">
    <div class="modal" v-if="visible">
      <div class="modal-content">
        <div>{{ modalStore.modals }}</div>
        <div>some text</div>
        <div>{{ options }}</div>
<!--        <slot/>-->
        <button @click="close">Close</button>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {useModalStore} from "@/store/modal";

defineOptions({
  name: 'Modal',
})
 const modalStore = useModalStore(); // Directly call the store

console.log('check store in component', modalStore)

const handleOutsideClick = (e: MouseEvent) => {
  const modalElement = (e.target as HTMLElement).closest('.modal');
  if (!modalElement) {
    modalStore?.closeModal(0); // Pass the modal ID that should be closed
  }
};

const currentModal = computed(() => modalStore.modals[modalStore.modals.length - 1]); // Последнее модальное окно

const visible = computed(() => !!currentModal.value); // Показывать модалку, если она есть
const options = computed(() => currentModal.value?.options || {});

const close = () => {
  modalStore.closeModal(currentModal.value?.id); // Закрытие модалки через стор
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
