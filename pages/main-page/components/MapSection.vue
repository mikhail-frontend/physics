<template>
  <section class="map-section">
    <div class="physics-container">
      <h2 class="map-section__title">
        Выберите город
      </h2>
      <div class="map-section__description">
        Узнайте подробности проведения дня физики в своем городе
      </div>
    </div>
    <div class="map-wrap physics-container">
      <div id="map">тут карта
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";

@Component
export default class MapSection extends Vue {

}
</script>

<style lang="scss" scoped>
@import "../styles/MapSection";
</style>