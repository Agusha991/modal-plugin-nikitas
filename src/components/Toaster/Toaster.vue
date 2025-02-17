<template>
  <Transition
    :enter-active-class="transition.enter"
    :leave-active-class="transition.leave"
  >
    <div
      v-if="isActive"
      class="toast__item"
      :class="[`toast__item--${type}`, `toast__item--${position}`]"
      :style="toastStyle"
      @mouseover="toggleTimer(true)"
      @mouseleave="toggleTimer(false)"
      @click="whenClicked"
    >
      <div class="v-toast__icon"></div>
      <p class="v-toast__text" v-html="message"></p>
      <button v-if="dismissible" class="toast__close" @click="dismissToast">
        ×
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import Timer from "./timer";

interface IProps {
  message: string;
  type: "success" | "error" | "info" | "warning";
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  dismissible: boolean;
  onDismiss: () => void;
  onClick: () => void;
  pauseOnHover: boolean;
  duration: number;
  index: number;
}

const props = withDefaults(defineProps<IProps>(), {
  message: "",
  type: "success",
  position: "top-right",
  dismissible: true,
  pauseOnHover: true,
  duration: 5000,
  onDismiss: () => {},
  onClick: () => {},
  index: 0,
});

const isActive = ref<boolean>(true);
let timer: Timer | null = null;

const transition = computed(() => {
  return ["top-left", "top-right"].includes(props.position)
    ? { enter: "toast--fade-in-down", leave: "toast--fade-out" }
    : { enter: "toast--fade-in-up", leave: "toast--fade-out" };
});

const toastStyle = computed(() => {
  const offset = props.index * 90;
  if (props.position.includes("top")) {
    return { top: `${10 + offset}px` };
  } else {
    return { bottom: `${10 + offset}px` };
  }
});

onMounted(() => {
  startTimer();
});

const startTimer = () => {
  if (props.duration > 0) {
    timer = new Timer(() => {
      isActive.value = false;
      props.onDismiss();
    }, props.duration);
    timer.resume();
  }
};

const toggleTimer = (state: boolean) => {
  if (props.pauseOnHover && timer) {
    state ? timer.pause() : timer.resume();
  }
};

const dismissToast = () => {
  isActive.value = false;
  props.onDismiss();
};

const whenClicked = () => {
  props.onClick();
};
</script>

<style scoped lang="scss">
.toast__item--top-left {
  top: 10px;
  left: 10px;
  align-items: flex-start;
}

.toast__item--top-right {
  top: 10px;
  right: 10px;
  align-items: flex-end;
}

.toast__item--bottom-left {
  bottom: 10px;
  left: 10px;
  align-items: flex-start;
}

.toast__item--bottom-right {
  bottom: 10px;
  right: 10px;
  align-items: flex-end;
}

.toast__item {
  width: 300px;
  padding: 15px;
  position: fixed;
  z-index: 9999;
  border-radius: 8px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: white;
  font-weight: 500;
  color: #333;
  pointer-events: auto;
  transition: all 0.3s ease-in-out;
  margin-bottom: 10px;
}

.toast__item--success {
  background-color: #4caf50;
  color: #fff;
}

.toast__item--error {
  background-color: #f44336;
  color: #fff;
}

.toast__item--info {
  background-color: #2196f3;
  color: #fff;
}

.toast__item--warning {
  background-color: #ff9800;
  color: #fff;
}

.toast__close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #fff;
}

.toast--fade-in-down {
  animation: fadeInDown 0.3s ease-out;
}

.toast--fade-in-up {
  animation: fadeInUp 0.3s ease-out;
}

.toast--fade-out {
  animation: fadeOut 0.3s ease-in forwards;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
