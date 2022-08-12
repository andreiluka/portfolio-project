import navigation from "./navigation.vue";

export default {
  title: "navigation",
  component: navigation
};

export const defaultView = () => ({
  components: { navigation },
  data() {
    return {
      navItems: [
        {navName: 'Страница 1', navPath: '/page1'},
        {navName: 'Страница 2', navPath: '/page2'},
        {navName: 'Страница 3', navPath: '/page3'}
      ]
    }
  },
  template: `<navigation :navItems="navItems"/>`
});

defaultView.story = {
  name: "Стандартный вид",
};