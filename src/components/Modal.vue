<template>
  <div v-if="visible" class="modal">
    <div class="modal-content">
      <h3>{{ options.title }}</h3>
      <p>{{ options.text }}</p>
      <button @click="close">Close</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const props = defineProps({
  options: {
    type: Object,
    required: true,
  },
  onClose: {
    type: Function,
    required: true,
  },
});

const visible = ref(true);

const close = () => {
  visible.value = false;
  props.onClose();
};
</script>

<style scoped>
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
