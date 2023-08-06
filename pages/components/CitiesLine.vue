<template>
  <div class="cities-line">
    <div class="cities" ref="ticker" v-if="citiesWithUniversities && citiesWithUniversities.length">
      <button class="city city-btn"
              v-for="city in cities"
              :data-city="JSON.stringify(city)"
              :key="city.id">
        {{ city.title }}
        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.46601 2.82389L11.655 6.81097L7.66797 11" stroke="#C0C9EB" stroke-width="1.6875"
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

      </button>
    </div>
  </div>

</template>

<script lang="ts">
import {Component, namespace, Ref, Vue, Watch} from "nuxt-property-decorator";
import {nanoid} from "nanoid";
import citiesWithUniversities from '../entities/universities'

// const PhysicsNamespace = namespace('physics')


@Component
export default class CitiesLine extends Vue {
  @Ref() ticker: HTMLElement;
  citiesWithUniversities = citiesWithUniversities;
  // @PhysicsNamespace.State('citiesWithUniversities') citiesWithUniversities
  cities = [];
  duration = 40000;
  isInitialized = false;


  generateArrayWithUniqueIds(inputArray, length) {
    const resultArray = [];
    const usedIds = new Set();
    for (let i = 0; i < length; i++) {
      let randomId;
      do {
        randomId = nanoid();
      } while (usedIds.has(randomId));

      usedIds.add(randomId);
      const newItem = {
        id: randomId,
        title: inputArray[i % inputArray.length].title,
        link: `/location/${inputArray[i % inputArray.length].id}`,
        city: inputArray[i % inputArray.length]
      };
      resultArray.push(newItem);
    }
    return resultArray;
  }

  setupViewport(): void {
    const {ticker} = this;
    if (!ticker) return;

    const tickerItems = ticker.querySelectorAll('.city') as NodeListOf<HTMLElement>;
    tickerItems.forEach((item: HTMLElement) => {
      ticker.prepend(item.cloneNode(true));
    });

    let tickerItemsWidth = 0;
    tickerItems.forEach((item: HTMLElement) => {
      const itemWidth: number = item.offsetWidth;
      tickerItemsWidth += itemWidth;
    });

    ticker.style.width = `${tickerItemsWidth}px`;
  }

  animateTicker(): void {
    const {ticker, duration} = this;
    if (!ticker) return;

    const tickerWidth: number = ticker.offsetWidth;
    let startTime: number;

    const animationStep = (timestamp: number): void => {
      if (!startTime) startTime = timestamp;
      const elapsed: number = timestamp - startTime;
      const progress: number = Math.min(elapsed / duration, 1);
      const marginLeft: number = -progress * tickerWidth;

      ticker.style.marginLeft = `${marginLeft}px`;

      if (progress < 1) {
        requestAnimationFrame(animationStep);
      } else {
        ticker.style.marginLeft = '0';
        startTime = 0;
        this.animateTicker();
      }
    };

    requestAnimationFrame(animationStep);
  }

  vanillaClickEvent(ev) {
    const isButton = ev.target.closest('button[data-city]');
    if (!isButton) return;
    const {city} = isButton.dataset;
    if (!city) return;
    this.$emit('clickOnCity', JSON.parse(city))
  }

  mounted() {
    this.onCitiesChange(this.citiesWithUniversities)
    document.addEventListener('click', this.vanillaClickEvent, {passive: true})
  }


  beforeDestroy() {
    document.removeEventListener('click', this.vanillaClickEvent);
  }

  initializeTicker(): void {
    const {ticker, isInitialized} = this;
    if (!ticker || isInitialized) return;
    this.setupViewport();
    this.animateTicker();
    this.isInitialized = true;
  }


  @Watch('citiesWithUniversities')
  onCitiesChange(newVal) {
    const length = newVal.length;
    this.$set(this, 'cities', length > 15 ? newVal : this.generateArrayWithUniqueIds(newVal, 15))
    if (newVal && newVal.length) {
      this.$nextTick(() => {
        this.initializeTicker();
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../styles/CitiesLine";
</style>

