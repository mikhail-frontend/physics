<template>
  <div class="physics-container location-page">
    <a href="/" class="location-page__back">
      <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.83008 10.6597L1.00022 5.82986L5.83008 1" stroke="#605E6C" stroke-width="1.9931"
              stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Всероссийский день физики
    </a>
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
            <nuxt-link :to="{
                name: 'index',
                query: {
                  coords: JSON.stringify([lat, lon])
                }
            }">Смотреть на карте
            </nuxt-link>
          </div>
        </div>
        <div class="location-page__info location-page__info_about" v-if="false"/>
      </div>
      <img src="https://i.ibb.co/YbQ4KWq/mifi.webp"
           alt="МИФИ"
           class="location-page__image"
      >

    </main>
    <location-events/>
    <nuxt-link :to="{   name: 'location-location_id-register',
        params: {
          location_id: $route.params.location_id
        }
    }"
               class="location-page__participate location-page__button">Принять участие
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import LocationEvents from "./components/LocationEvents.vue";

@Component({
  components: {
    LocationEvents
  }
})
export default class Location extends Vue {
  lat = 55.557587;
  lon = 37.422576;
}
</script>
<style lang="scss" scoped>
@import "./styles/index";
</style>

<style lang="scss">
@import "./styles/noScoped";
</style>