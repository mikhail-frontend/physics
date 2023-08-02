<template>
  <section class="main-banner">
    <nuxt-img
        src="https://storage.yandexcloud.net/matetech-prod-file-storage/411354/triangle_0f1812592ace404ce217be909ac5b958.png"
        alt="ЦО Коалиция"
        format="webp"
        class="main-banner__triangle"
    />
    <nuxt-img
        src="https://storage.yandexcloud.net/matetech-prod-file-storage/411355/sphere_0f1812592ace404ce217be909ac5b958.png"
        alt="ЦО Коалиция"
        format="webp"
        class="main-banner__sphere"
    />
    <div class="main-banner__date">17 сентября 2023</div>
    <h1 class="main-banner__title">Всероссийский день&nbsp;физики</h1>
    <div class="main-banner__description">
      День физики объединяет 20 городов и 25 инженерных университетов по всей России.
      Будет интересно каждому!
    </div>
    <div class="main-banner__buttons">
      <nuxt-link to="#" class="main-banner__participate main-banner__button" v-ripple>Принять участие</nuxt-link>
      <nuxt-link to="#" class="main-banner__locations main-banner__button" v-ripple>Места проведения</nuxt-link>
    </div>
  </section>
</template>
<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";

@Component
export default class MainBanner extends Vue {

}
</script>

<style lang="scss" scoped>
@import "../styles/MainBanner";
</style>