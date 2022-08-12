import Vue from 'vue';
import axios from 'axios';

const thumbs = {
   template: '#portfolio-thumbs',
   props: {
      works: Array,
      currentWork: Object,
      newTransform: String
   }
}

const btns = {
   template: '#portfolio-btns',
   props: {
      works: Array,
      currentIndex: Number
   }
}

const slider = {
   template: '#portfolio-slider',
   props: {
      works: Array,
      currentWork: Object,
      currentIndex: Number,
      newTransform: String
   },
   computed: {
      reversedWorks() {
         return [...this.works].reverse();
      }
   },
   components:{
      thumbs,
      btns
   }
}

const marks = {
   template: '#portfolio-marks',
   props: {
      tags: Array
   }
}

const words = {
   template: '#portfolio-words',
   props: {
      currentWork: Object
   }
}

new Vue({
   el: '#portfolio-widget',
   template: '#portfolio-content',
   components: {
      slider,
      marks,
      words
   },
   data() {
      return {
         works: [],
         currentIndex: 0,
         startStep: 0,
         currentStep: 0,
         directionStep: '',
         desktopWindow: 0
      }
   },
   computed: {
      currentWork() {
         return this.works.length ? this.works[this.currentIndex] : {photo: '', techs: ''};
      },
      tagsArray() {
         return this.currentWork.techs.split(', ').filter(el => el.trim());
      },
      newTransform() {
         let step = 100 / this.works.length;
         let visibleThumbs = window.innerWidth < this.desktopWindow ? 3 : 4;
         let visibleIndex = visibleThumbs - 1;
         let utmostStep = (this.works.length - visibleThumbs) * step;

         if (this.currentIndex > visibleIndex && this.directionStep == 'next') {
            this.currentStep = this.startStep + step;
            if (this.currentStep > utmostStep) this.currentStep = this.startStep;
         } else if (this.currentIndex < visibleIndex && this.directionStep == 'prev') {
            this.currentStep = this.startStep - step;
            if (this.currentStep < 0) this.currentStep = 0;
         }
         
         this.startStep = this.currentStep;
         this.directionStep = '';
         return `translateY(${this.currentStep}%)`;
      }
   },
   watch: {
      currentIndex(value) {
         const lastIndex = this.works.length - 1;
         if (value < 0) this.currentIndex = 0;
         if (value > lastIndex) this.currentIndex = lastIndex;
      }
   },
   methods: {
      handleSlide(direction) {
         switch(direction) {
            case 'next':
               this.currentIndex++;
               this.directionStep = 'next';
               break;
            case 'prev':
               this.currentIndex--;
               this.directionStep = 'prev';
               break;
         }
      },
      handleClick(thumbIndex) {
         this.currentIndex = this.works.length - thumbIndex - 1;
      }
   },
   async created() {
      let userId = 12;
      let respWorks = await axios.get(`https://webdev-api.loftschool.com/works/${userId}`);
      this.works = respWorks.data;
      
      const variablesCss = require('../styles/variables.json');
      this.desktopWindow = parseInt(variablesCss["bp-desktop"]);
   }
});