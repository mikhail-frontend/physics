<template>
  <main class="physics-main">
    <main-banner/>
    <about-section/>
    <speakers-section/>
  </main>
</template>
<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import MainBanner from "./components/MainBanner.vue";
import AboutSection from "./components/AboutSection.vue";
import SpeakersSection from "./components/SpeakersSection.vue";
@Component({
  components: {
    MainBanner,
    AboutSection,
    SpeakersSection
  }
})
export default class MainPage extends Vue{

}
</script>
<style lang="scss" scoped>
@import "./styles/index";
</style>
<style lang="scss">
@import "./styles/noScoped";
</style>