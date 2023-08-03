<template>
  <div class="cities-line">
    <div class="cities" ref="ticker">
      <nuxt-link :to="city.link"
                 class="city"
                 v-for="city in cities"
                 :key="city.id">
        {{ city.text }}
        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.46601 2.82389L11.655 6.81097L7.66797 11" stroke="#C0C9EB" stroke-width="1.6875" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

      </nuxt-link>
    </div>
  </div>

</template>

<script lang="ts">
import {Component, Ref, Vue} from "nuxt-property-decorator";
import cities from "../entities/cities";

@Component
export default class CitiesLine extends Vue {
  @Ref() ticker: HTMLElement;

  cities = cities;
  duration = 40000;

  setupViewport() {
    const {ticker} = this;
    if (!ticker) return;
    const tickerItems = ticker.querySelectorAll('.city');
    tickerItems.forEach(item => {
      ticker.prepend(item.cloneNode(true));
    });
    let tickerItemsWidth = 0;
    tickerItems.forEach((item: HTMLElement) => {
      const itemWidth = item.offsetWidth;
      tickerItemsWidth += itemWidth;
    });
    ticker.style.width = `${tickerItemsWidth}px`;
  }

  animateTicker() {
    const {ticker, duration} = this;
    if (!ticker) return;
    const tickerWidth = ticker.offsetWidth;
    let startTime;

    const animationStep = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const marginLeft = -progress * tickerWidth;

      ticker.style.marginLeft = `${marginLeft}px`;

      if (progress < 1) {
        requestAnimationFrame(animationStep);
      } else {
        ticker.style.marginLeft = '0';
        startTime = null;
        this.animateTicker();
      }
    }

    requestAnimationFrame(animationStep);
  }


  initializeTicker() {
    const {ticker} = this;
    if (!ticker) return;
    this.setupViewport();
    this.animateTicker();
  }


  mounted() {
    this.initializeTicker();
  }
}
</script>
<style lang="scss" scoped>
@import "../styles/CitiesLine";
</style>

