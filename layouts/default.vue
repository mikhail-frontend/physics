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
        }
      ]
    };
  }
}
</script>

<style lang="scss">
@import "../pages/main-page/styles/noScoped";
</style>

