<template>
  <div class="modal-container" @click.stop>
    <div class="modal-container-content" @click.stop>
      <h3>{{ options.title }}</h3>
      <p>{{ options.message }}</p>
      <button @click="handleClose()">Close</button>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  options: {
    type: Object,
    required: true,
  },
  onClose: {
    type: Function,
    required: true,
  },
})

const handleClose = () => {
  props.onClose();
};

</script>

<style lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  .container {
    background: white;
    padding: 20px;
    border-radius: 8px;
  }

  .modal-content {

  }
}

</style>
