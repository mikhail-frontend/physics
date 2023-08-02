<template>
  <section class="about-section physics-container">

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