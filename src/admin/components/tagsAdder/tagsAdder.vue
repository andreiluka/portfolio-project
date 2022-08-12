<template>
   <div class="tags-adder-component">
      <app-input
         placeholder="Перечислите теги через запятую"
         title="Добавление тега"
         :value="value"
         @input="$emit('input', $event)"
         autofocus="autofocus"
         no-side-paddings
         :errorMessage="errorMessage"
      />
      <ul class="tags-adder__list">
         <li 
            v-for="(tag, index) in tagsArray"
            :key="index"
            class="tags-adder__item"
         >
            <span class="tags-adder__item-name">{{tag}}</span>
            <span class="tags-adder__item-cross">
               <icon symbol="cross" @click="removeTag(index)" :style="{width: '10px'}"></icon>
            </span>
         </li>
      </ul>
   </div>
</template>

<script>
export default {
   components: {
      icon: () => import("components/icon"),
      appInput: () => import("components/input")
   },
   props: {
      value: {
         type: String,
         default: ""
      },
      errorMessage: {
         type: String,
         default: ""
      }
   },
   computed: {
      tagsArray() {
         return this.value.split(', ').filter(el => el.trim());
      }
   },
   methods: {
      removeTag(indexTag) {
         let editArray = this.tagsArray.filter((item, index) => index !== indexTag);

         let newTagsString = editArray.join(', ');
         this.$emit('removeTag', newTagsString);
      }
   }
};
</script>

<style lang="postcss" scoped src="./tagsAdder.pcss"></style>