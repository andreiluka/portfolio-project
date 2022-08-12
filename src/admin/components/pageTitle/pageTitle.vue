<template>
   <div class="page-title-component">
      <div class="admin-header">
         <div class="admin-title">{{title}}</div>
         <slot></slot>
      </div>
   </div>
</template>

<script>

export default {
   components: {},
   props: {
      title: String
   }
}
</script>

<style lang="postcss" scoped src="./pageTitle.pcss"></style>