import { getCurrentInstance } from 'vue';

export default {
    setup() {
        const instance = getCurrentInstance();
        const $modal = instance?.appContext.config.globalProperties.$modal;

        const openModal = () => {
            if ($modal) {
                $modal.open('exampleModal', { someOption: 'value' });
            } else {
                console.error('$modal is not available in globalProperties');
            }
        };

        return {
            openModal,
        };
    },
};
