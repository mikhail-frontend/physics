<template>
  <section class="speakers-section physics-container">
    <header class="speakers-section__header">День физики —</header>
    <section-heading class="program-section__heading">Самые известные спикеры</section-heading>

    <div class="speakers-slider">
      <div class="speakers-slider__arrow speakers-slider__arrow_left" @click="slider.back()">
        <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg" v-ripple>
          <circle cx="22.5" cy="22.5" r="22.5" transform="matrix(1 1.74846e-07 1.74846e-07 -1 0 45)" fill="#142038"/>
          <path d="M22.0248 27.7427L16.0001 22.0084M16.0001 22.0084L21.7344 15.9836M16.0001 22.0084L28.002 22.0084" stroke="white" stroke-width="2.1782" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

      </div>
      <div class="speakers-slider__arrow speakers-slider__arrow_right" @click="slider.next()">
        <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg" v-ripple>
          <circle cx="22.5" cy="22.5" r="22.5" transform="matrix(-1 0 0 1 45 0)" fill="#142038"/>
          <path d="M22.9752 17.2595L28.9999 22.9938M28.9999 22.9938L23.2656 29.0186M28.9999 22.9938L16.998 22.9938" stroke="white" stroke-width="2.1782" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <ssr-carousel
          :slides-per-page="3"
          :gutter="45"
          :loop="true"
          ref="slider"
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
import {Component, Vue, Ref} from "nuxt-property-decorator";
import speakers from "../entities/speakers";
import SpeakerItem from "./SpeakerItem.vue";
// @ts-ignore
import SsrCarousel from 'vue-ssr-carousel';
import SectionHeading from "./SectionHeading.vue";

@Component({
  components: {
    SpeakerItem,
    SsrCarousel,
    SectionHeading
  }
})
export default class SpeakersSection extends Vue {
  speakers = speakers;
  @Ref() slider;



}
</script>
<style lang="scss" scoped>
@import "../styles/SpeakersSection";
</style>
