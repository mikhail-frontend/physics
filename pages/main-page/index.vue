<template>
  <main>
    <main-banner/>
    <about-section/>
  </main>
</template>
<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import MainBanner from "./components/MainBanner.vue";
import AboutSection from "./components/AboutSection.vue";
@Component({
  components: {
    MainBanner,
    AboutSection
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