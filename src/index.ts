import { createApp, h } from "vue";
import { createPinia } from "pinia";
import { useModalStore } from "store/modal";
import Modal from "components/Modal/index.vue";
import DataTable from "components/DataTable.vue";
import Tooltip from "components/Tooltip.vue";
import Spinner from "components/Spinner.vue";
import { watch } from "vue";
import { IModalState } from "types";
import ModalPlugin from "plugins/modalPlugin";
import ToasterPlugin from "plugins/toasterPlugin";

const components = { Modal, DataTable, Tooltip, Spinner };

export default {
  install(app: any) {
    if (!app._context.pinia) {
      const pinia = createPinia();
      app.use(pinia);
    }

    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component);
    });

    app.use(ModalPlugin);
    app.use(ToasterPlugin);
  },
};

export { Modal, DataTable, Tooltip, Spinner };
