import pageTitle from "./pageTitle.vue";
import appButton from "components/button";
import { action } from "@storybook/addon-actions";

const methods = {
  onClick: action("onClick")
}

export default {
  title: "pageTitle",
  components: { pageTitle },
};

export const defaultView = () => ({
  components: { pageTitle },
  template: `<page-title :title="'Зоголовок страницы'"/>`,
});

defaultView.story = {
  name: "Стандартный вид"
}

export const withСontentView = () => ({
  components: { pageTitle, appButton },
  template: `
  <page-title :title="'Зоголовок страницы'">
    <app-button title="Send!" @click="onClick" />
  </page-title>
  `,
  methods
});

withСontentView.story = {
  name: "С содержимым"
}
