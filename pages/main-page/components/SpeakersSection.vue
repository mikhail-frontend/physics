<template>
  <section class="speakers-section physics-container">
    <header class="speakers-section__header">День физики —</header>
    <h2 class="speakers-section__heading">Самые известные спикеры</h2>

    <div class="speakers-slider">
      <ssr-carousel
          :slides-per-page="3"
          :gutter="45"
          :responsive="[
              {
                maxWidth: 800,
                slidesPerPage: 2,
              },

              {
                maxWidth: 600,
                gutter: 0,
                slidesPerPage: 1,
              }
      ]"
      >
        <div  v-for="speaker in speakers"
              :key="speaker.id">
          <speaker-item :speaker="speaker"
          />
        </div>

      </ssr-carousel>

    </div>
  </section>
</template>
<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import speakers from "../entities/speakers";
import SpeakerItem from "./SpeakerItem.vue";
// @ts-ignore
import SsrCarousel from 'vue-ssr-carousel';

@Component({
  components: {
    SpeakerItem,
    SsrCarousel
  }
})
export default class SpeakersSection extends Vue {
  speakers = speakers;
}
</script>
<style lang="scss" scoped>
@import "../styles/SpeakersSection";
</style>
