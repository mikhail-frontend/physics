<template>
  <div  class="yandex-map" v-if="!loading">
    <svg class="toggle-map" v-if="isListOpen"
         @click="isListOpen = !isListOpen"
         width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M36 0H8C3.58172 0 0 3.58172 0 8V28C0 32.4183 3.58172 36 8 36H36V0Z" fill="#0C0C0C" fill-opacity="0.8"/>
      <path fill-rule="evenodd" clip-rule="evenodd"
            d="M15.2929 13.2929C14.9024 13.6834 14.9024 14.3166 15.2929 14.7071L18.5858 18L15.2929 21.2929C14.9024 21.6834 14.9024 22.3166 15.2929 22.7071C15.6834 23.0976 16.3166 23.0976 16.7071 22.7071L20.7071 18.7071C21.0976 18.3166 21.0976 17.6834 20.7071 17.2929L16.7071 13.2929C16.3166 12.9024 15.6834 12.9024 15.2929 13.2929Z"
            fill="white"/>
    </svg>

    <svg v-else
         @click="isListOpen = !isListOpen"
         class="toggle-map" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M36 0H8C3.58172 0 0 3.58172 0 8V28C0 32.4183 3.58172 36 8 36H36V0Z" fill="#0C0C0C" fill-opacity="0.8"/>
      <path fill-rule="evenodd" clip-rule="evenodd"
            d="M20.7071 13.2929C21.0976 13.6834 21.0976 14.3166 20.7071 14.7071L17.4142 18L20.7071 21.2929C21.0976 21.6834 21.0976 22.3166 20.7071 22.7071C20.3166 23.0976 19.6834 23.0976 19.2929 22.7071L15.2929 18.7071C14.9024 18.3166 14.9024 17.6834 15.2929 17.2929L19.2929 13.2929C19.6834 12.9024 20.3166 12.9024 20.7071 13.2929Z"
            fill="white"/>
    </svg>
    <div class="yandex-map__cities" :class="{'active': isListOpen}">

      <div class="map-cities__title">Города</div>
      <div class="profile-radios">
        <div class="profile-radio" v-for="(city) in citiesWithUniversities" :key="city.id">
          <input type="radio"
                 name="profile"
                 @change="checkCity(city)"
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
import {Component, Vue, namespace, Watch} from "nuxt-property-decorator";


const PhysicsNamespace = namespace('physics')
@Component
export default class YandexMap extends Vue {
  @PhysicsNamespace.State('citiesWithUniversities') citiesWithUniversities

  loading = true;
  checked_city = 0;
  map_center = [];
  all_universities = []
  yandexMap = null;
  isListOpen = false;


  mounted() {
    this.setData();
    // this.initMap();
    this.$nextTick(() => {
      this.initMap();
      // this.openBalloonWithCoords([55.719488, 37.464314]);
    })
  }

  initMap(map_center = this.map_center) {
    const {ymaps} = window;
    const {all_universities} = this;
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
          const {lat, lon, address, name, id} = university;
          const placemark = new ymaps.Placemark([lat, lon], {
            balloonContent: self.createPointData(name, address, id),
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
      self.yandexMap = universitiesMap;
      window.universitiesMap = universitiesMap
    });
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

  createPointData(name, address, id) {
    return `<div class="university-balloon">
              <svg class="university-balloon__image" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.4733 3.34564C15.9908 3.06993 15.3985 3.06993 14.916 3.34564L3.92996 9.62337C3.17739 10.0534 2.91593 11.0121 3.34597 11.7647C3.63535 12.2711 4.1641 12.5551 4.70835 12.5557V23.5415C3.84158 23.5415 3.13892 24.2441 3.13892 25.1109C3.13892 25.9777 3.84158 26.6804 4.70835 26.6804H26.6804C27.5472 26.6804 28.2499 25.9777 28.2499 25.1109C28.2499 24.2441 27.5472 23.5415 26.6804 23.5415V12.5557C27.2249 12.5553 27.7539 12.2713 28.0433 11.7647C28.4734 11.0121 28.2119 10.0534 27.4593 9.62337L16.4733 3.34564ZM9.41665 14.1249C8.54988 14.1249 7.84722 14.8275 7.84722 15.6943V20.4026C7.84722 21.2694 8.54988 21.9721 9.41665 21.9721C10.2834 21.9721 10.9861 21.2694 10.9861 20.4026V15.6943C10.9861 14.8275 10.2834 14.1249 9.41665 14.1249ZM14.125 15.6943C14.125 14.8275 14.8276 14.1249 15.6944 14.1249C16.5612 14.1249 17.2638 14.8275 17.2638 15.6943V20.4026C17.2638 21.2694 16.5612 21.9721 15.6944 21.9721C14.8276 21.9721 14.125 21.2694 14.125 20.4026V15.6943ZM21.9721 14.1249C21.1053 14.1249 20.4027 14.8275 20.4027 15.6943V20.4026C20.4027 21.2694 21.1053 21.9721 21.9721 21.9721C22.8389 21.9721 23.5416 21.2694 23.5416 20.4026V15.6943C23.5416 14.8275 22.8389 14.1249 21.9721 14.1249Z" fill="#A1A7BA"/>
              </svg>
              <div class="university-balloon__title">${name}</div>
              <div class="university-balloon__address">${address}</div>
              <a href="/location/${2}" class="university-balloon__link">
                 Выбрать
                 <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M1.70874 1.38864L6.65639 6.09776L1.94727 11.0454" stroke="white" stroke-width="1.9931" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
               </a>
            </div>
                `;
  };

  checkCity(city) {
    const {yandexMap} = this;
    if (!yandexMap || !city || !city.city_coords) return;
    this.yandexMap.destroy()
    this.loading = true;
    this.$nextTick(() => {
      this.loading = false;
      this.checked_city = city.id;
      this.initMap(city.city_coords)
      this.isListOpen = !this.isListOpen;
    })
  }

  openBalloonWithCoords(coords: [number | string, number | string]) {
    if (!coords) return;
    let [lat, lon] = coords;
    lat = Number(lat);
    lon = Number(lon);
    const {ymaps} = window;
    if (!ymaps || !lat || !lon) return;
    ymaps.ready(() => {
      const {yandexMap} = this;
      if (!yandexMap) return;
      yandexMap.geoObjects.each((el) => {
        const elementCoords = el.geometry.getCoordinates();
        const [elLat, elLon] = elementCoords;
        if (elLat === lat && elLon === lon) {
          el.balloon.open();
          yandexMap.setCenter([elLat, elLon]);
          return
        }
      })
    });
    this.$router.replace(({
      query: {}
    })).catch(() => ({}))
  }

  @Watch('$route.query')
  onQueryChange({city, coords}) {
    if(city) {
      this.checkCity(JSON.parse(city));
      this.$router.replace(({
        query: {}
      })).catch(() => ({}))
    }

  }

}
</script>

<style lang="scss" scoped>
@import "../styles/YandexMap";
</style>

<style lang="scss">
@import "../styles/YandexBalloon";
</style>