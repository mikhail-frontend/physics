<template>
  <section class="about-section physics-container">
    <main class="about-section__main">
      <div class="about-main__content">
        <h2 class="about-main__title" v-html="aboutData.title"/>
        <div class="about-main__description" v-html="aboutData.description"/>
      </div>
      <div class="about-main__images">
        <nuxt-img src="https://storage.yandexcloud.net/matetech-prod-file-storage/411356/atom_5697f8ee77c8494cec840fd4bbd4695c.webp"
                  alt="ЦО Коалиция"
                  class="about-main__atom"
        />
        <div class="about-main__sphere-big"/>
        <div class="about-main__sphere-small"/>

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