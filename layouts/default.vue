<template>
  <v-app>
    <nuxt/>
  </v-app>
</template>

<script lang="ts">
import {
  Component, Vue
} from 'nuxt-property-decorator';

@Component
export default class AppLayout extends Vue {
  head() {
    return {
      title: 'Онлайн-школа Коалиция | Ваша образовательная траектория',
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: true
        },
        {
          href: 'https://fonts.googleapis.com/css2?family=Golos+Text:wght@400;500;800&display=swap',
          rel: 'stylesheet'
        },
        {
          href: 'https://api-maps.yandex.ru',
          rel: 'preconnect'
        }
      ],
      script: [
        {
          src: `https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=<ваш API-ключ>`,
          type: `text/javascript`,
          id: 'yandex',
          async: true,
          defer: true
        },
      ],
    };
  }
}
</script>

<style lang="scss">
@import "../pages/main-page/styles/noScoped";
</style>

