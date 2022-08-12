<template>
   <div class="navigation-component">
      <div class="container container--admin">
         <ul class="navigation__list">
            <li
               v-for="(navItem, indexItem) in navItems" 
               :key="indexItem"
               class="navigation__item"
            >
               <router-link class="navigation__router-link" :to="navItem.navPath">
                  <span class="navigation__link">{{navItem.navName}}</span>
               </router-link>
            </li>
         </ul>
      </div>
   </div>
</template>

<script>
export default {
   props: {
      navItems: Array
   }
}
</script>

<style lang="postcss" scoped src="./navigation.pcss"></style>