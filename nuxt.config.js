import colors from 'vuetify/es5/util/colors';
import ru from 'vuetify/src/locale/ru';
import { resolve } from 'path';

// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack');

function removeProtocolFromUrl(url) {
  return url.replace(/^https?:\/\//, '');
}

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Онлайн-школа Коалиция | Ваша образовательная траектория',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ]
  },
  loading: false,
  alias: { '@img': resolve(__dirname, './assets/img') },

  privateRuntimeConfig: {
    VUE_APP_APP_PORT: process.env.VUE_APP_APP_PORT,
    VUE_APP_SERVER_HOST: process.env.VUE_APP_SERVER_HOST,
    HOST_ADMIN: process.env.VUE_APP_ADMIN_URL
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  router: {
    middleware: [],
    prefetchLinks: false
  },

  serverMiddleware: [

  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/axios', '~/plugins/v-copy',  '~/plugins/masonry', '~/plugins/v-mask', { src: '~/plugins/OAuth.ts', ssr: false }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    'vue-ssr-carousel/nuxt'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://image.nuxtjs.org/
    '@nuxt/image',
    // https://nuxt-speedkit.grabarzundpartner.dev/
    'nuxt-speedkit'
  ],

  image: process.env.NODE_ENV === 'development' ? null : {
    domains: [removeProtocolFromUrl(`${process.env.VUE_APP_SERVER_HOST}/storage`)],
    alias: { storage: `${process.env.VUE_APP_SERVER_HOST}/storage` }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: { manifest: { lang: 'ru' } },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    lang: {
      locales: { ru },
      current: 'ru'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config) {
      config.resolve.alias.vue = 'vue/dist/vue.min.js';
    },
    // extractCSS: true,
    babel: {
      plugins: [
          ],
      presets({ isClient }, preset) {
        if (isClient) {
          preset[1].targets = {
            browsers: [
              'Chrome >= 60',
              'Safari >= 10.1',
              'iOS >= 10.3',
              'Firefox >= 54',
              'Edge >= 15'
            ]
          };
        }
        return [preset];
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        popper: ['popper.js', 'default'],
        TrendChart: 'vue-trend-chart',
        masonry: 'vue-masonry-css'
      })
    ]

  },

  ignore: [
    'pages/**/components/*',
    'pages/**/styles/*',
    'pages/**/entities/*',
    'pages/**/*.scss',
    'pages/**/*.ts',
    'store/**/entities/*',
    'store/**/mixins/*',
    'store/**/helpers/*',
    'store/**/types.ts',
    'store/**/globalTypes.ts'
  ],

  vue: { config: { devtools: process.env.NODE_ENV === 'development' } }
};
