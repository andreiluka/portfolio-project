import axios from "axios";
import Vue from "vue";

const btns = {
   template: '#reviews__btns',
   methods: {
      slide(direction) {
         this.$emit('slide', direction);
      }
   }
}

const review = {
   template: '#review',
   props: {
      man: Object
   }
}

const slider = {
   template: '#reviews-slider',
   props: {
      reviews: Array,
      newTransform: String
   },
   components: {
      review
   }
}

new Vue({
   el:'#reviews__widget',
   template: '#reviews__content',
   components: {
      btns,
      slider
   },
   data() {
      return {
         reviews: [],
         currentIndex: 0,
         windowWidth: 0,
         phonesWindow: 0
      }
   },
   computed: {
      newTransform() {
         this.windowWidth = window.innerWidth;
         const ratio = this.windowWidth > this.phonesWindow ? 50 : 100;
         const step = this.currentIndex * ratio;
         return `translateX(-${step}%)`;
      }
   },
   watch: {
      currentIndex(value) {
         const lastIndex = this.reviews.length - 1;
         if (value < 0) this.currentIndex = lastIndex;
         if (value > lastIndex) this.currentIndex = 0;
      }
   },
   methods: {
      handleSlide(direction) {
         switch(direction) {
            case 'next':
               this.currentIndex++;
               break;
            case 'prev':
               this.currentIndex--;
               break;
         }
      }
   },
   async created() {
      let userId = 12;
      let respReviews = await axios.get(`https://webdev-api.loftschool.com/reviews/${userId}`);
      this.reviews = respReviews.data;
      
      const variablesCss = require('../styles/variables.json');
      this.phonesWindow = parseInt(variablesCss["bp-phones"]);

      this.windowWidth = window.innerWidth;
   }
});