<template>
  <div v-if="!loading">
    <pre>{{citiesWithSchools}}</pre>
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

  mounted() {
    this.getSchools();
    const {ymaps} = window;


  }

  async getSchools() {
    try {
      this.loading = true;
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
      this.loading = false;
    } catch (e) {
      this.$set(this, 'citiesWithSchools', universities);
      this.loading = false;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/YandexMap";
</style>