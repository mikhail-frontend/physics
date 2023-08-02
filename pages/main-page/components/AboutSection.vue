<template>
  <section class="about-section physics-container">
    <main class="about-section__main">
      <div class="about-main__content">
        <h2 class="about-main__title" v-html="aboutData.title"/>
        <div class="about-main__description" v-html="aboutData.description"/>
      </div>
      <div class="about-main__images">

      </div>
    </main>
  </section>
</template>
<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import aboutData from "../entities/aboutData";
@Component
export default class AboutSection extends Vue{
  aboutData = aboutData;
}
</script>
<style lang="scss" scoped>
@import "../styles/AboutSection";
</style>