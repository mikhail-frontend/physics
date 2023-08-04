<template>
  <main class="physics-main">
    <main-banner/>
    <about-section/>
    <speakers-section/>
    <program-section/>
    <map-section v-if="!loading"/>
    <register-banner/>
  </main>
</template>
<script lang="ts">
import {Component, namespace, Vue} from "nuxt-property-decorator";
import MainBanner from "./components/MainBanner.vue";
import AboutSection from "./components/AboutSection.vue";
import SpeakersSection from "./components/SpeakersSection.vue";
import ProgramSection from "./components/ProgramSection.vue";
import MapSection from "./components/MapSection.vue";
import RegisterBanner from "./components/RegisterBanner.vue";
const PhysicsNamespace = namespace('physics')
@Component({
  components: {
    MainBanner,
    AboutSection,
    SpeakersSection,
    ProgramSection,
    MapSection,
    RegisterBanner
  }
})
export default class MainPage extends Vue{
  @PhysicsNamespace.Action('getUniversities') getUniversities;
  loading = true;
  async mounted() {
    this.loading = true;
    await this.getUniversities();
    this.loading = false;
  }
}
</script>
<style lang="scss" scoped>
@import "./styles/index";
</style>
