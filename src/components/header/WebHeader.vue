<template>
  <header class="container-fluid bg-white py-3 border-bottom fixed-top">
      <div class="container-md d-flex justify-content-between align-items-center ps-5">
          <router-link to="/"><img src="@/assets/images/LogoVintage.png" alt="Logo" width="140" height="35" /></router-link>
          <navigation-bar></navigation-bar>
      </div>
  </header>
</template>

<script>
import NavigationBar from "../header/NavigationBar.vue"
export default {
  components: {
      NavigationBar
  }
}
</script>
