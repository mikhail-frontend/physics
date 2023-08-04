<template>
  <div v-if="!loading" class="yandex-map">
    <div class="yandex-map__cities">
      <div class="map-cities__title">Города</div>
      <div class="profile-radios">
        <div class="profile-radio" v-for="(city) in citiesWithUniversities" :key="city.id">

          <input type="radio"
                 name="profile"
                 :id="city.id"
                 :value="city.id"
                 :checked="checked_city === city.id"
                 class="profile-radio__input"
          />
          <label :for="city.id">{{ city.title }}</label>
        </div>
      </div>
    </div>
    <div id="map" class="yandex-map__map"></div>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import universities from "../entities/universities";
import axios from 'axios'

@Component
export default class YandexMap extends Vue {

  loading = true;
  citiesWithUniversities = [];
  checked_city = 0;
  map_center = [];
  all_universities = []

  async mounted() {
    await this.getUniversities();
    this.setData();
    this.initMap();
  }

  initMap() {
    const {ymaps} = window;
    const {map_center, citiesWithUniversities} = this;
    if (!ymaps) return;
    ymaps.ready(function () {
      const universitiesMap = new ymaps.Map('map', {
        center: map_center,
        zoom: 10,
        behaviors: ['default', 'scrollZoom'],
        controls: ['zoomControl']
      }, {
        searchControlProvider: 'yandex#search'
      });

      universitiesMap.behaviors.disable('scrollZoom');
    });
  }

  async getUniversities() {
    this.loading = true;
    try {
      const {data: serverResponse} = await axios.get(
          `http://localhost:8080/api/public/companies/1/map_cities`,
          {
            params: {
              'with': 'mapUniversities;mapUniversities.mapCity',
              all: 1
            }
          }
      );
      const {data} = serverResponse;
      this.$set(this, 'citiesWithUniversities', data);
    } catch (e) {
      this.$set(this, 'citiesWithUniversities', universities);
    }
  }

  setData() {
    const {citiesWithUniversities} = this;
    if (!citiesWithUniversities.length) return;
    const [first] = citiesWithUniversities;
    this.checked_city = first.id;
    this.map_center = first.city_coords;
    const all_universities = citiesWithUniversities.map(({map_universities}) => map_universities).flat();
    this.$set(this, 'all_universities', all_universities);
    this.loading = false
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/YandexMap";
</style>