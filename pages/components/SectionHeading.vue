<template>
  <h2 class="section-heading">
    <slot/>
  </h2>
</template>
<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
@Component
export default class SectionHeading extends Vue {

}
</script>
<style lang="scss" scoped>
.section-heading {
  color: #142039;
  font-size: 38px;
  font-style: normal;
  font-weight: 500;
  line-height: 48px;
  letter-spacing: -0.76px;
  margin-bottom: 64px;
  display: flex;
  align-items: center;
  gap: 20px;

  &:before {
    content: '';
    display: block;
    background-image: url('https://storage.yandexcloud.net/matetech-prod-file-storage/411379/one-star_5756e90d442293809d7ce2c7ca479d2e.webp');
    background-size: contain;
    background-repeat: no-repeat;
    width: 29px;
    height: 29px;
  }

  @media (max-width: 800px) {
    font-size: 30px;
    line-height: 48px;
    letter-spacing: -0.6px;
  }
  @media (max-width: 600px) {
    font-size: 24px;
    line-height: 30px;
    letter-spacing: -0.48px;
    margin-bottom: 32px;
  }
}
</style>