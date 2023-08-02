<template>
  <div>
    <main-banner/>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import MainBanner from "./components/MainBanner.vue";
@Component({
  components: {
    MainBanner
  }
})
export default class MainPage extends Vue{

}
</script>
<style lang="scss" scoped>
@import "./styles/index";
</style>
<style lang="scss">
@import "./styles/noScoped";
</style>