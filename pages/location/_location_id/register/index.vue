<template>
  <div class="physics-container location-register">
    <nuxt-link to="/main-page" class="location-page__back">
      <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.83008 10.6597L1.00022 5.82986L5.83008 1" stroke="#605E6C" stroke-width="1.9931"
              stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Всероссийский день физики
    </nuxt-link>

    <h1 class="location-register__title">Регистрация</h1>
    <div class="location-register__description">Чтобы принять участие в Дне физики вам необходимо заполнить эту форму</div>
    <register-form/>

  </div>
</template>
<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import RegisterForm from "./components/RegisterForm.vue";
@Component({
  components: {
    RegisterForm
  }
})
export default class LocationRegister extends Vue {

}
</script>

<style lang="scss" scoped>
@import "./styles/index";
</style>

<style lang="scss">
@import "../styles/noScoped";
</style>