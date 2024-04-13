import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

// Diretiva personalizada para foco automático
app.directive('focus', {
  // Quando o elemento vinculado é inserido no DOM...
  mounted(el) {
    // Coloque o foco no elemento
    el.focus();
  }
});

app.mount("#app");
