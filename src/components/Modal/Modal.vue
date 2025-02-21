<template>
  <div class="modal-container" @click.stop>
    <div
      class="modal-container-header"
      :class="{
        'modal-container-header-show-all': showMore,
        [getTypeModal.nameClass]: getTypeModal.nameClass !== '',
      }"
    >
      <div class="modal-container-header-title">
        <component :is="getTypeModal.img" />
        <div>{{ options.title }}</div>
      </div>
      <div
        class="modal-container-header-show-more"
        @click="showMore = !showMore"
      >
        {{ showMore ? "Скрыть" : "Смотреть больше" }}
      </div>
    </div>
    <CloseIcon class="modal-button-close" @click="onClose" />
    <div v-if="showMore" class="modal-container-subtitle">
      Описание: <br />
      {{ options.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import CloseIcon from "../icons/CloseIcon.vue";
import ErrorIcon from "../icons/ErrorIcon.vue";
import SuccessIcon from "../icons/SuccessIcon.vue";
import WarningIcon from "../icons/WarningIcon.vue";
import InfoIcon from "../icons/InfoIcon.vue";

interface IProps {
  options: {
    title: string;
    message: string;
  };
  name: string;
  onClose: () => void;
}

const props = defineProps<IProps>();
const showMore = ref<boolean>(false);

const getTypeModal = computed<{ img: any; nameClass: string }>(() => {
  switch (props.name) {
    case "error":
      return { img: ErrorIcon, nameClass: "error" };
    case "success":
      return { img: SuccessIcon, nameClass: "success" };
    case "warning":
      return { img: WarningIcon, nameClass: "warning" };
    case "info":
      return { img: InfoIcon, nameClass: "info" };
    default:
      return {
        img: SuccessIcon,
        nameClass: "",
      };
  }
});
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
  background: rgba(0, 0, 0, 0.2);
  z-index: 9999;

  &-button-close {
    width: 12px;
    height: 12px;
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }

  &-container {
    position: relative;
    font-family: "Roboto Condensed", serif;
    font-optical-sizing: auto;

    background: white;
    border-radius: 16px;
    max-width: 540px;
    width: 100%;

    &-header {
      padding: 20px;
      border-radius: 12px;
      font-size: 20px;
      font-weight: 400;
      line-height: 24px;
      &-show-all {
        border-radius: 12px 12px 0 0;
      }

      &-title {
        color: white;
        display: flex;
        align-items: start;
        gap: 20px;
      }

      &-show-more {
        color: #f5c9c3;
        text-align: right;
        font-size: 16px;
        cursor: pointer;
      }
    }

    &-subtitle {
      padding: 20px;
      font-size: 18px;
      font-weight: 400;
      line-height: 24px;
    }
  }
}

.error {
  background: #ee5542;
}

.success {
  background: #15b853;
}

.warning {
  background: #f4a900;
}

.warning {
  background: #0085cf;
}
</style>