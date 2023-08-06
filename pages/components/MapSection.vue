<template>
  <section class="map-section" id="map-section">
    <div class="physics-container">
      <h2 class="map-section__title">
        Выберите город
      </h2>
      <div class="map-section__description">
        Узнайте подробности проведения дня физики в своем городе
      </div>
    </div>
    <div class="map-wrap">
      <yandex-map ref="map"/>
    </div>
  </section>
</template>
<script lang="ts">
import {Component, Ref, Vue} from "nuxt-property-decorator";
import YandexMap from "./YandexMap.vue";

@Component({
  components: {
    YandexMap
  }
})
export default class MapSection extends Vue {
  @Ref() map;

  openBalloon(coords) {
    console.log(234)
    this.map.openBalloonWithCoords(JSON.parse(coords))
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/MapSection";
</style>