<template>
  <div class="speaker">
    <img :src="speaker.image" :alt="speaker.name" class="speaker__image">
    <div class="speaker__info">
      <div class="speaker__name">{{speaker.name}}</div>
      <div class="speaker__extra">{{speaker.extra_text}}</div>
      <div class="speaker__description" v-html="speaker.description"/>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Vue, Prop} from "nuxt-property-decorator";
@Component
export default class SpeakerItem extends Vue{
  @Prop({type: Object, default: () => ({})}) speaker;

}
</script>
<style lang="scss" scoped>
@import "../styles/SpeakerItem";
</style>