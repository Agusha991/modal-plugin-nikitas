<template>
  <div class="modal" v-if="visible">
    <div class="modal-content">
      <slot></slot>
      <button @click="close">Close</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Modal',
  setup() {
    const visible = ref(false);

    const close = () => {
      visible.value = false;
    };

    return {
      visible,
      close,
    };
  },
});
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
