<template>
  <section class="main-banner">
    <img
        src="https://storage.yandexcloud.net/matetech-prod-file-storage/411354/triangle_0f1812592ace404ce217be909ac5b958.png"
        alt="ЦО Коалиция"
        class="main-banner__triangle"
    />
    <img
        src="https://storage.yandexcloud.net/matetech-prod-file-storage/411355/sphere_0f1812592ace404ce217be909ac5b958.png"
        alt="ЦО Коалиция"
        class="main-banner__sphere"
    />
    <div class="main-banner__date">17 сентября 2023</div>
    <h1 class="main-banner__title">Всероссийский день&nbsp;физики</h1>
    <div class="main-banner__description">
      День физики объединяет 20 городов и 25 инженерных университетов по всей России.
      Будет интересно каждому!
    </div>
    <div class="main-banner__buttons">
      <nuxt-link to="/location/2"
                 class="main-banner__participate main-banner__button"
                 v-ripple>Принять участие</nuxt-link>
      <button @click="$vuetify.goTo('#map-section')"
              class="main-banner__locations main-banner__button"
              v-ripple>Места проведения</button>
    </div>
    <cities-line @clickOnCity="(payload) => $emit('clickOnCity', payload)"/>
  </section>
</template>
<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import CitiesLine from "./CitiesLine.vue";
@Component({
  components: {
    CitiesLine
  }
})
export default class MainBanner extends Vue {

}
</script>

<style lang="scss" scoped>
@import "../styles/MainBanner";
</style>