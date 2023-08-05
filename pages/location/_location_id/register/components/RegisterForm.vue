<template>
  <form @submit.prevent.stop="submitRegister" class="physics-register">
    <div class="physics-register__line">
      <div class="physics-register__control">
        <div class="physics-control__title">Ваш статус</div>
        <v-autocomplete v-model="formModel.status.value"
                        :items="statuses"
                        item-text="text"
                        item-value="value"
                        outlined
                        :height="44"
                        filled
                        placeholder="Выберите статус"
                        hide-details
                        class="physics-control__autocomplete"
                        :class="{
                          'physics-control__autocomplete_error': formModel.status.error
                        }"
                        @change="blurInput('status')"
        />
        <div class="physics-control__error" v-if="formModel.status.error">{{ formModel.status.error }}</div>
      </div>
    </div>
    <div class="physics-register__line physics-register__line_triple">
      <div class="physics-register__control"
           :class="{'physics-register__control_error': formModel.surname.error}"
      >
        <div class="physics-control__title">Фамилия</div>
        <input type="text" class="physics-control__input"
               placeholder="Фамилия"
               v-model="formModel.surname.value"
               @blur="blurInput('surname')"
        />
        <div class="physics-control__error" v-if="formModel.surname.error">{{ formModel.surname.error }}</div>
      </div>
      <div class="physics-register__control"
           :class="{'physics-register__control_error': formModel.name.error}"
      >
        <div class="physics-control__title">Имя</div>
        <input type="text"
               class="physics-control__input"
               placeholder="Имя"
               @blur="blurInput('name')"
               v-model="formModel.name.value"
        />
        <div class="physics-control__error" v-if="formModel.name.error">{{ formModel.name.error }}</div>
      </div>
      <div class="physics-register__control"
           :class="{'physics-register__control_error': formModel.second_name.error}"
      >
        <div class="physics-control__title">Отчество</div>
        <input type="text"
               class="physics-control__input"
               placeholder="Отчество"
               @blur="blurInput('second_name')"
               v-model="formModel.second_name.value"
        />
        <div class="physics-control__error" v-if="formModel.second_name.error">{{ formModel.second_name.error }}</div>

      </div>
    </div>
    <div class="physics-register__line physics-register__line_double">
      <div class="physics-register__control"
           :class="{'physics-register__control_error': formModel.email.error}"
      >
        <div class="physics-control__title">Контактная почта</div>
        <input type="text"
               class="physics-control__input"
               placeholder="Ваш email"
               @blur="blurInput('email')"
               v-model="formModel.email.value"
        />
        <div class="physics-control__error" v-if="formModel.email.error">{{ formModel.email.error }}</div>

      </div>
      <div class="physics-register__control">
        <div class="physics-control__title">Город, на площадку в котором вы хотели бы прийти</div>
        <v-autocomplete v-model="formModel.city.value"
                        :items="cities"
                        item-text="title"
                        item-value="id"
                        outlined
                        :height="44"
                        filled
                        placeholder="Выберите город"
                        hide-details
                        class="physics-control__autocomplete"
                        :class="{
                          'physics-control__autocomplete_error': formModel.city.error
                        }"
                        @change="blurInput('city')"
        />
        <div class="physics-control__error" v-if="formModel.city.error">{{ formModel.city.error }}</div>
      </div>
    </div>
    <div class="physics-register__rules" :class="{'physics-register__rules_error': formModel.accept_rules.error}">
      <input class="physics-register__accept"
             type="checkbox"
             id="accept_rules"
             v-model="formModel.accept_rules.value"
             @change="blurInput('accept_rules')"
      >
      <label :class="{'physics-register__label_error': formModel.accept_rules.error}"
             for="accept_rules">Я согласен на обработку персональных данных</label>
      <div class="physics-control__error" v-if="formModel.accept_rules.error">{{ formModel.accept_rules.error }}</div>

    </div>

    <button type="submit" class="physics-register__submit" v-ripple>Далее</button>

  </form>
</template>

<script lang="ts">
import {Component, namespace, Vue} from "nuxt-property-decorator";
import {emailRules, requiredRules} from "~/helpers/inputRules";
const PhysicsNamespace = namespace('physics')

@Component
export default class RegisterForm extends Vue {
  loading = true;
  @PhysicsNamespace.Action('getUniversities') getUniversities;

  statuses = [
    {
      value: 'teacher',
      text: 'Учитель'
    },
    {
      value: 'student',
      text: 'Ученик'
    },
  ]

  formModel = {
    accept_rules: {
      value: false,
      touched: false,
      rules: [(val) => val === true || 'Обязательное поле'],
      error: '',
    },
    name: {
      value: '',
      touched: false,
      rules: requiredRules,
      error: '',
    },
    surname: {
      value: '',
      touched: false,
      rules: requiredRules,
      error: '',
    },
    second_name: {
      value: '',
      touched: false,
      rules: requiredRules,
      error: '',
    },
    email: {
      value: '',
      touched: false,
      rules: emailRules,
      error: '',
    },
    status: {
      value: 'teacher',
      touched: false,
      rules: requiredRules,
      error: '',
    },
    city: {
      value: '',
      touched: false,
      rules: requiredRules,
      error: '',
    }

  }

  cities = [];

  blurInput(inputName) {
    const input = this.formModel[inputName];
    if (!input) return;
    const {rules, value} = input;
    let error = '';
    rules.forEach(rule => {
      const result = rule(value);
      if (typeof result === 'string') {
        error = result;
        return
      }
    });
    this.$set(input, 'error', error);
  }

  async mounted() {
    this.loading = true;
    const cities = await this.getUniversities();
    this.cities = cities;
    this.loading = false;

  }
  submitRegister() {
    const formKeys = Object.keys(this.formModel);
    formKeys.forEach(key => this.blurInput(key));
    const hasError =  Object.values(this.formModel).some(({error}) => error);
    console.log(
        {
          hasError, formModel: this.formModel
        }
    );
    setTimeout(() => {
      this.$emit('goSecondStep', this.formModel.status.value)
    }, 1000)
  }
}
</script>
<style lang="scss" scoped>
@import "../styles/RegisterForm";
</style>
<style lang="scss">
@import "../styles/AutocompleteStyling";
</style>