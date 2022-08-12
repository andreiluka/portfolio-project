import Vue from 'vue';
import axios from 'axios';

const row = {
   template: '#skills-row',
   props: {
      skill: Object
   }
}

new Vue ({
   el: '#skills-widget',
   template: '#skills-list',
   components: {
      row
   },
   data() {
      return {
         skills: []
      }
   },
   async created() {
      let userId = 12;
      let respCategories = await axios.get(`https://webdev-api.loftschool.com/categories/${userId}`);
      let categories = respCategories.data;
      
      let respSkills = await axios.get(`https://webdev-api.loftschool.com/skills/${userId}`);
      let skills = respSkills.data;

      let arrayRows = [];
      for (let category of categories) {
         let rowObj = {};
         rowObj.category = category.category;
         rowObj.skills = skills.filter(item => item.category === category.id);
         arrayRows.unshift(rowObj);
      }
      
      this.skills = arrayRows;
   }
});