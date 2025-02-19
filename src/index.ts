import { createPinia } from "pinia";
import Modal from "./components/Modal/Modal.vue";
import DataTable from "./components/DataTable/DataTable.vue";
import Tooltip from "./components/Tooltip/Tooltip.vue";
import Spinner from "./components/Spinner/Spinner.vue";
import ModalPlugin, { useModal } from "./plugins/modalPlugin";
import ToasterPlugin, { useToast } from "./plugins/toasterPlugin";

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

export { Modal, DataTable, Tooltip, Spinner, useModal, useToast };