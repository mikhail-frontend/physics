<template>
  <main class="physics-main">
    <main-banner @clickOnCity="clickOnCity"/>
    <about-section/>
    <speakers-section/>
    <program-section/>
    <map-section ref="mapSection" v-if="!loading"/>
    <register-banner/>
  </main>
</template>
<script lang="ts">
import {Component, namespace, Vue, Watch, Ref} from "nuxt-property-decorator";
import MainBanner from "./components/MainBanner.vue";
import AboutSection from "./components/AboutSection.vue";
import SpeakersSection from "./components/SpeakersSection.vue";
import ProgramSection from "./components/ProgramSection.vue";
import MapSection from "./components/MapSection.vue";
import RegisterBanner from "./components/RegisterBanner.vue";
import * as process from "process";

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
export default class MainPage extends Vue {
  @PhysicsNamespace.Action('getUniversities') getUniversities;
  @Ref() mapSection;
  loading = true;

  clickOnCity({city}) {
    this.$vuetify.goTo('#map-section');
    this.$router.replace({
      query: {
        ...this.$route.query,
        city: JSON.stringify(city)
      }
    }).catch(() => ({}))
  }


  async mounted() {
    this.loading = true;
    await this.getUniversities();
    this.loading = false;
    this.$nextTick(() => {
      this.onQueryChange((this.$route.query as any));
    })
  }

  @Watch('$route.query')
  onQueryChange({coords}) {
    if (!coords) return;
    this?.$vuetify?.goTo('#map-section');
    this?.mapSection?.openBalloon(coords);

  }
}
</script>
<style lang="scss" scoped>
@import "./styles/index";
</style>
