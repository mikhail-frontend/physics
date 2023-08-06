<template>
  <section class="register-banner-section physics-container">
    <div class="register-banner">
      <div class="register-banner__content">
        <h2 class="register-banner__title">Зарегистрируйтесь на всероссийский день физики</h2>
        <div class="register-banner__description">Узнайте подробности проведения дня физики в своем городе</div>
        <nuxt-link to="/location/2" class="register-banner__link">Принять участие</nuxt-link>
      </div>
      <div class="register-banner__figures"></div>
    </div>
  </section>
</template>
<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
@Component
export default class RegisterBanner extends Vue {

}
</script>
<style lang="scss" scoped>
@import "../styles/RegisterBanner";
</style>