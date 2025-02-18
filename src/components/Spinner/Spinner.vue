<template>
  <div v-if="show" class="spinner-overlay">
    <div class="spinner" :style="spinnerStyle"></div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'

interface SpinnerProps {
  show: boolean            
  size?: string            
  color?: string           
  thickness?: string      
}

const props = defineProps<SpinnerProps>()

// computed properties
const spinnerStyle = computed(() => ({
  width: props.size,
  height: props.size,
  borderWidth: props.thickness,
  borderStyle: 'solid',
  borderColor: `${props.color} transparent transparent transparent`,
  borderRadius: '50%'
}))
</script>

<style scoped lang="scss">
.spinner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7); 
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999; 
}

.spinner {
  border: var(--spinner-thickness, 4px) solid transparent;
  border-top: var(--spinner-thickness, 4px) solid var(--spinner-color, #4285f4);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
