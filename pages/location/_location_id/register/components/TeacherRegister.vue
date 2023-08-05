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
        <div class="physics-control__title">Ваша должность</div>
        <v-autocomplete v-model="formModel.position.value"
                        :items="positions"
                        item-text="text"
                        item-value="value"
                        outlined
                        :height="44"
                        filled
                        placeholder="Выберите должность"
                        hide-details
                        class="physics-control__autocomplete"
                        :class="{
                          'physics-control__autocomplete_error': formModel.position.error
                        }"
                        @change="blurInput('position')"
        />
        <div class="physics-control__error" v-if="formModel.position.error">{{ formModel.position.error }}</div>
      </div>
    </div>


    <button type="submit" class="physics-register__submit" v-ripple>Далее</button>

  </form>
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import {requiredRules} from "~/helpers/inputRules";

@Component
export default class TeacherRegister extends Vue {
  loading = true;

  positions = [
    {
      value: 'teacher',
      text: 'Учитель'
    },
    {
      value: 'teaching_director',
      text: 'Завуч'
    },
    {
      value: 'student',
      text: 'Ученик'
    },
  ]

  formModel = {
    school_name: {
      value: '',
      touched: false,
      rules: requiredRules,
      error: '',
    },
    position: {
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
    if(hasError) return;
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