import { type App } from "vue";
import Demo from "./Demo.vue";
import Container from "./Container.vue";

const components = [Demo, Container];

export default {
  install: (app: App) => {
    components.forEach(component => {
      app.component(component.name!, component);
    });
  }
};
