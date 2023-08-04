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
import pin from "../entities/pin";
import axios from 'axios'

@Component
export default class YandexMap extends Vue {

  loading = true;
  citiesWithUniversities = [];
  checked_city = 0;
  map_center = [];
  all_universities = []
  yandexMap = null;

  async mounted() {
    await this.getUniversities();
    this.setData();
    this.initMap();
  }

  initMap() {
    const {ymaps} = window;
    const {map_center, citiesWithUniversities, all_universities} = this;
    const self = this;
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
      const MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
          '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      )

      if (Array.isArray(all_universities) && all_universities.length) {
        for (let university of all_universities) {
          const {lat, lon, address, name} = university;
          const placemark = new ymaps.Placemark([lat, lon], {
            balloonContent: self.getPointData(name, address)
          }, {

            iconLayout: 'default#imageWithContent',
            iconImageHref: require('../img/pin.png'),
            iconImageSize: [40, 40],
            iconImageOffset: [-10, -10],
            iconContentOffset: [5, 5],
            iconContentLayout: MyIconContentLayout
          });
          universitiesMap.geoObjects.add(placemark)
        }
      }
      universitiesMap.behaviors.disable('scrollZoom');
      self.yandexMap = universitiesMap
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


  getPointData(name, address) {
    return `<div class="school-balloon">
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.4733 3.34564C15.9908 3.06993 15.3985 3.06993 14.916 3.34564L3.92996 9.62337C3.17739 10.0534 2.91593 11.0121 3.34597 11.7647C3.63535 12.2711 4.1641 12.5551 4.70835 12.5557V23.5415C3.84158 23.5415 3.13892 24.2441 3.13892 25.1109C3.13892 25.9777 3.84158 26.6804 4.70835 26.6804H26.6804C27.5472 26.6804 28.2499 25.9777 28.2499 25.1109C28.2499 24.2441 27.5472 23.5415 26.6804 23.5415V12.5557C27.2249 12.5553 27.7539 12.2713 28.0433 11.7647C28.4734 11.0121 28.2119 10.0534 27.4593 9.62337L16.4733 3.34564ZM9.41665 14.1249C8.54988 14.1249 7.84722 14.8275 7.84722 15.6943V20.4026C7.84722 21.2694 8.54988 21.9721 9.41665 21.9721C10.2834 21.9721 10.9861 21.2694 10.9861 20.4026V15.6943C10.9861 14.8275 10.2834 14.1249 9.41665 14.1249ZM14.125 15.6943C14.125 14.8275 14.8276 14.1249 15.6944 14.1249C16.5612 14.1249 17.2638 14.8275 17.2638 15.6943V20.4026C17.2638 21.2694 16.5612 21.9721 15.6944 21.9721C14.8276 21.9721 14.125 21.2694 14.125 20.4026V15.6943ZM21.9721 14.1249C21.1053 14.1249 20.4027 14.8275 20.4027 15.6943V20.4026C20.4027 21.2694 21.1053 21.9721 21.9721 21.9721C22.8389 21.9721 23.5416 21.2694 23.5416 20.4026V15.6943C23.5416 14.8275 22.8389 14.1249 21.9721 14.1249Z" fill="#A1A7BA"/>
</svg>

                                <div class="school__title">${name}</div>
                                <div>${address}</div>
                            </div>
                `
  };
}
</script>

<style lang="scss" scoped>
@import "../styles/YandexMap";
</style>