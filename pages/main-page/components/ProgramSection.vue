<template>
  <section class="program-section physics-container">
    <section-heading class="program-section__heading">Насыщенная программа</section-heading>
    <div class="programs">
      <div class="program" v-for="program in programs" :key="program.id">
        <img :src="program.image" :alt="program.text" class="program__image">
        <div class="program__text">{{program.text}}</div>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import SectionHeading from "./SectionHeading.vue";
import programs from "../entities/programs";
@Component({
  components: {
    SectionHeading
  }
})
export default class ProgramSection extends Vue{
  programs = programs;
}
</script>

<style lang="scss" scoped>
@import "../styles/ProgramSection";
</style>