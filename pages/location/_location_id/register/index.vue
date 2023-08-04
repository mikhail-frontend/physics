<template>
  <div class="physics-container location-register">
    <nuxt-link to="/main-page" class="location-page__back">
      <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.83008 10.6597L1.00022 5.82986L5.83008 1" stroke="#605E6C" stroke-width="1.9931"
              stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Всероссийский день физики
    </nuxt-link>

  </div>
</template>
<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";

@Component
export default class LocationRegister extends Vue {
  mounted() {
    console.log(this.$route.name)
  }
}
</script>

<style lang="scss" scoped>
@import "./styles/index";
</style>

<style lang="scss">
@import "../styles/noScoped";
</style>