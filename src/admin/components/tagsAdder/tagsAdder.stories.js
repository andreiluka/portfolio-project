import tagsAdder from "./tagsAdder.vue";

export default {
  title: "tagsAdder",
  components: {tagsAdder}
}

export const defaultView = () => ({
  components: { tagsAdder },
  data() {
    return {
      tags: "one, two, three, four"
    }
  },
  methods: {
    editTags(newTagsString) {
      this.tags = newTagsString;
    }
  },
  template: `
    <div>
      <pre>{{tags}}</pre>
      <tags-adder @removeTag="editTags" v-model="tags" />
    </div>
  `
});

defaultView.story = {
  name: "Стандартный вид",
  parameters: {
    backgrounds: [
      { name: 'white', value: '#fff', default: true },
      { name: 'grey', value: '#8395a7', default: true }
    ],
  },
};
