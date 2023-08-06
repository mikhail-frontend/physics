<template>
  <div class="physics-container location-register">
    <a href="/" class="location-page__back">
      <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.83008 10.6597L1.00022 5.82986L5.83008 1" stroke="#605E6C" stroke-width="1.9931"
              stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Всероссийский день физики
    </a>

    <h1 class="location-register__title">Регистрация</h1>
    <div class="location-register__description" v-if="step === 1">
      Чтобы принять участие в Дне физики вам необходимо заполнить эту форму
    </div>
    <div class="location-register__type" v-if="form_type">
      {{ form_type === 'teacher' ? 'Для учителей' : 'Для учеников' }}
    </div>
    <register-form v-if="step === 1" @goSecondStep="goSecondStep"/>
    <teacher-register @filledForm="isModal = true" v-if="step === 2 && form_type === 'teacher'"/>
    <student-register @filledForm="isModal = true" v-if="step === 2 && form_type === 'student'"/>

    <v-dialog v-model="isModal" max-width="576" content-class="location-register__dialog">
      <div class="location-register__success">
        <div class="location-register__close" v-ripple @click="closeModal"/>
        <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="45" cy="45" r="45" fill="#F1EFFF"/>
          <path d="M33 50.4189L42.7297 56.5L58.5405 34" stroke="#735CFF" stroke-width="3.64865" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="register-success__title">Спасибо за регистрацию</div>
        <div class="register-success__description">
          Наш робот отправил вам на почту приветственное письмо. Наши письма иногда могут попадать в “Спам” или “Промоакции”, не забудьте и их тоже проверить.
          <br/>      <br/>
          До встречи 17 сентбября!
        </div>
        <button v-ripple class="location-register__button" @click="closeModal">Закрыть</button>
      </div>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'nuxt-property-decorator';
import RegisterForm from './components/RegisterForm.vue';
import TeacherRegister from './components/TeacherRegister.vue';
import StudentRegister from './components/StudentRegister.vue';

@Component({
  components: {
    RegisterForm,
    TeacherRegister,
    StudentRegister
  }
})
export default class LocationRegister extends Vue {
  step = 1;
  form_type = '';
  isModal = false;

  goSecondStep(form_type) {
    this.form_type = form_type;
    this.step = 2;
  }

  closeModal() {
    this.isModal = false
  }
}
</script>

<style lang="scss" scoped>
@import "./styles/index";
</style>

<style lang="scss">
@import "../styles/noScoped";
</style>