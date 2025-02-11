<template>
  <div
    class="tooltip-container"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
  >
    <slot />

    <div v-if="isVisible" class="tooltip" :class="props.position">
      {{ props.content }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface TooltipProps {
  content: string; 
  position?: "top" | "bottom" | "left" | "right"; 
  width?: string; 
}

const props = withDefaults(defineProps<TooltipProps>(), {
  content: "",
  position: "top",
  width: "200px",
});

// states
const isVisible = ref<boolean>(false);

// functions
const showTooltip = (): void => {
  isVisible.value = true;
}
const hideTooltip = (): void => {
  isVisible.value = false;
}
</script>

<style scoped lang="scss">
.tooltip-container {
  display: inline-block;
  position: relative;
}

.tooltip {
  position: absolute;
  padding: 8px 12px;
  background-color: #333;
  color: #fff;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.2;
  white-space: normal;
  z-index: 999;
  width: v-bind(width);
  opacity: 0;
  animation: fadeIn 0.2s forwards ease;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.tooltip.top {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 8px;
}

.tooltip.bottom {
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 8px;
}

.tooltip.left {
  top: 50%;
  right: 100%;
  transform: translateY(-50%);
  margin-right: 8px;
}

.tooltip.right {
  top: 50%;
  left: 100%;
  transform: translateY(-50%);
  margin-left: 8px;
}
</style>
