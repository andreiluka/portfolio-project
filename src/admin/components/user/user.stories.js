import user from "./user.vue";

export default {
   title: "user",
   components: {user}
};

export const defaultView = () => ({
   components: {user},
   template: `
      <user 
         :userName="'Иван Петров'" 
         :profession="'Директор'"
      />
   `,
});

defaultView.story = {
   name: "Стандартный вид"
}

export const colorView = () => ({
   components: {user},
   template: `
      <user 
         :userName="'Иван Петров'"
         :color="'red'"
      />
   `,
});

colorView.story = {
   name: "Цветной вид"
}
