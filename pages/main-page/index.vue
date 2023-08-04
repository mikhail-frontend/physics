<template>
  <main class="physics-main">
    <main-banner/>
    <about-section/>
    <speakers-section/>
    <program-section/>
    <map-section/>
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
  head() {
    return {
      script: [
        {
          src: `https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=<ваш API-ключ>`,
          type: `text/javascript`,
          id: 'yandex'
        },
      ],
      link: [
        {
          href: 'https://api-maps.yandex.ru',
          rel: 'preconnect'
        }
      ]
    }
  }

  async fetch() {
    await this.getUniversities();
  }
}
</script>
<style lang="scss" scoped>
@import "./styles/index";
</style>
