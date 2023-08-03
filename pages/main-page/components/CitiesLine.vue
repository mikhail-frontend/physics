<template>
  <div class="cities-line">
    <div class="cities" ref="ticker">
      <div class="city" v-for="city in cities" :key="city.id">{{ city.text }}</div>
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

  animateTicker(stop = false) {
    const {ticker} = this;
    if (!ticker) return;
    const duration = 30000;
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

    

    // ticker.addEventListener('mouseenter', function () {
    //   cancelAnimationFrame(animationFrame);
    // });
    //
    // ticker.addEventListener('mouseout', this.animateTicker);
  }


  mounted() {
    this.initializeTicker();
  }
}
</script>
<style lang="scss" scoped>
@import "../styles/CitiesLine";

.cities {
  display: flex;
  align-items: center;
  gap: 40px;
}

.city {
  display: flex;
  padding: 12px 16px;
  align-items: center;
  gap: 4px;
  border-radius: 40px;
  background: rgba(100, 112, 157, 0.08);
  color: #C0C9EB;

  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  white-space: nowrap;
}
</style>

