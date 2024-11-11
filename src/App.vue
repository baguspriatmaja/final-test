<template>
  <web-header></web-header>
  <router-view></router-view>
  <web-footer v-if="!$route.meta.hideFooter"></web-footer>
</template>

<script setup>
import WebFooter from './components/footer/WebFooter.vue';
import WebHeader from './components/header/WebHeader.vue';
</script>

