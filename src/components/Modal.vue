<template>
  <div class="modal" v-if="options">
    <div class="modal-content">
      <h3>{{ options.title }}</h3>
      <p>{{ options.message }}</p>
      <button @click="() =>onClose">Close</button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    options: {
      type: Object,
      required: true,
    },
    onClose: {
      type: Function,
      required: true,
    },
  },
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
