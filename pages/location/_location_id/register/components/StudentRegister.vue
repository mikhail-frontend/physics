<template>
  <form @submit.prevent.stop="submitTeacher" class="physics-register">
    <div class="physics-register__line">
      <div class="physics-register__control"
           :class="{'physics-register__control_error': formModel.school_name.error}"
      >
        <div class="physics-control__title">Официальное сокращение вашей школы</div>
        <input type="text" class="physics-control__input"
               placeholder="Введите сокращение"
               v-model="formModel.school_name.value"
               @blur="blurInput('school_name')"
        />
        <div class="physics-control__error" v-if="formModel.school_name.error">{{ formModel.school_name.error }}</div>
      </div>
    </div>

    <div class="physics-register__line">
      <div class="physics-register__control">
        <div class="physics-control__title">Ваш класс обучения</div>
        <v-autocomplete v-model="formModel.school_class.value"
                        :items="school_classes"
                        item-text="text"
                        item-value="value"
                        outlined
                        :height="44"
                        filled
                        placeholder="Выберите класс"
                        hide-details
                        class="physics-control__autocomplete"
                        :class="{
                          'physics-control__autocomplete_error': formModel.school_class.error
                        }"
                        @change="blurInput('school_class')"
        />
        <div class="physics-control__error" v-if="formModel.school_class.error">{{ formModel.school_class.error }}</div>
      </div>
    </div>


    <button type="submit" class="physics-register__submit" v-ripple>Далее</button>

  </form>
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import {requiredRules} from "~/helpers/inputRules";

@Component
export default class StudentRegister extends Vue {
  loading = true;

  school_classes = [
    {
      value: '5',
      text: '5'
    },
    {
      value: '6',
      text: '6'
    },
    {
      value: '8',
      text: '8'
    },
    {
      value: '9',
      text: '9'
    },
    {
      value: '10',
      text: '10'
    },
    {
      value: '11',
      text: '11'
    },
  ]

  formModel = {
    school_name: {
      value: '',
      touched: false,
      rules: requiredRules,
      error: '',
    },
    school_class: {
      value: '',
      touched: false,
      rules: requiredRules,
      error: '',
    },
  }


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


  submitTeacher() {
    const formKeys = Object.keys(this.formModel);
    formKeys.forEach(key => this.blurInput(key));
    const hasError = Object.values(this.formModel).some(({error}) => error);
    console.log(
        {
          hasError, formModel: this.formModel
        }
    );
    this.$emit('filledForm')
  }
}
</script>
<style lang="scss" scoped>
@import "../styles/RegisterForm";
</style>
<style lang="scss">
@import "../styles/AutocompleteStyling";
</style>