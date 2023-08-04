<template>
  <div v-if="!loading" class="yandex-map">
    <div class="yandex-map__cities">
      <div class="map-cities__title">Города</div>
      <div class="profile-radios">
        <div class="profile-radio" v-for="(city) in citiesWithSchools" :key="city.id">

          <input type="radio"
                 name="profile"
                 :id="city.id"
                 :value="city.id"
                 :checked="checked_city === city.id"
                 class="profile-radio__input"
          />
          <label :for="city.id">{{city.title}}</label>
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
  citiesWithSchools = [];
  checked_city = 0;
  map_canter = [];

  async mounted() {
    await this.getSchools();
    this.setData();
    const {ymaps} = window;
  }

  async getSchools() {
    this.loading = true;
    try {
      const {data:serverResponse} = await axios.get(
          `http://localhost:8080/api/public/companies/1/map_cities`,
          {
             params: {
               'with': 'mapUniversities;mapUniversities.mapCity',
               all: 1
             }
          }
      );
      const {data} = serverResponse;
      this.$set(this, 'citiesWithSchools', data);
    } catch (e) {
      this.$set(this, 'citiesWithSchools', universities);
    }
  }

  setData() {
    const {citiesWithSchools} = this;
    if(!citiesWithSchools.length) return;
    const [first] = citiesWithSchools;
    this.checked_city = first.id;
    this.map_canter = first.city_coords;
    this.loading = false
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/YandexMap";
</style>