<template>
  <div class="physics-container location-page">
    <main class="location-page__main">
      <div class="location-page__content">
        <h1 class="location-page__title">
          МИФИ
        </h1>
        <div class="location-page__info location-page__info_date">
          <div class="location-page__info-title">
            Дата и время
          </div>
          <div class="location-page__info-description">
            17 сентября 2023, 14:00 - 16:00
          </div>
        </div>
        <div class="location-page__info location-page__info_place">
          <div class="location-page__info-title">
            Место проведения
          </div>
          <div class="location-page__info-description">
            Олимпийский проспект, д.11 стр. 1, вход с остановки <br/>
            <nuxt-link to="#">Смотреть на карте</nuxt-link>
          </div>
        </div>
        <div class="location-page__info location-page__info_about" >
          <div class="location-page__info-title">
            Об университете
          </div>
          <div class="location-page__info-description">
            Один из ведущих российских университетов,
            готовящий специалистов по 18 направлениям:
            <ul>
              <li>Международные отношения</li>
              <li>Экономика (международные экономические отношения)</li>
              <li>Юриспруденция (международное право) и др.</li>
            </ul>
          </div>
        </div>
      </div>
      <img src="https://i.ibb.co/YbQ4KWq/mifi.webp"
           alt="МИФИ"
           class="location-page__image"
      >

    </main>

  </div>
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";

@Component
export default class Location extends Vue {

}
</script>
<style lang="scss" scoped>
@import "./styles/index";
</style>