<template>
  <div class="modal-container" @click.stop>
    <div
        class="modal-container-header"
        :class="{'modal-container-header-show-all': showMore, [getTypeModal().nameClass]: true}"
    >
      <div class="modal-container-header-title">
        <component :is="getTypeModal().img"/>
        <div>{{ options.title }}</div>
      </div>
      <div class="modal-container-header-show-more" @click="showMore = !showMore">
        {{ showMore ? 'Скрыть' : 'Смотреть больше' }}
      </div>
    </div>
    <CloseIcon class="modal-button-close" @click="onClose()"/>
    <div v-if="showMore" class="modal-container-subtitle">
      Описание: <br/>
      {{ options.message }}
    </div>
  </div>
</template>

<script setup lang="ts">

import {ref} from "vue";
import CloseIcon from "@/components/Close-icon.vue";
import ErrorIcon from "@/components/Error-icon.vue";
import SuccessIcon from "@/components/Success-icon.vue";

interface IProps {
  options: {
    title: string;
    message: string;
  },
  name: string,
  onClose: Function
}

const props = defineProps<IProps>()
const showMore = ref<boolean>(false)


const getTypeModal = (): { img: any, nameClass: string } => {
  switch (props.name) {
    case 'error':
      return {img: ErrorIcon, nameClass: 'error'}
    case 'success':
      return {img: SuccessIcon, nameClass: 'success'}
    default:
      return {
        img: SuccessIcon,
        nameClass: ''
      }
  }
}

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
      &-show-all{
        border-radius: 12px 12px 0 0;
      }

      &-title {
        color: white;
        display: flex;
        align-items: start;
        gap: 20px;
      }

      &-show-more {
        color: #F5C9C3;
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
  background: #EE5542;
}

.success {
  background: #15B853;
}

</style>
