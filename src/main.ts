import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store, key } from "./store";
import "bulma/css/bulma.min.css";
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faKey,
  faCheck,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

library.add(faUser);
library.add(faKey);
library.add(faCheck);
library.add(faExclamationTriangle);
dom.watch();

const app = createApp(App);
app.use(store, key);
app.use(router);
app.mount("#app");
