<template>
  <div class="location-events">
    <h2 class="location-events__title">Программа</h2>
    <ul class="location-events__list">
      <li class="location-event" v-for="event in events" :key="event.id">
        <div class="location-event__time">{{ event.time }}</div>
        <main class="location-event__main">
          <div class="location-event__title">
            {{ event.title }}
            <div class="location-event__label" v-if="event.label">{{ event.label }}</div>
          </div>
          <div class="location-event__description" v-html="event.description"/>
          <div class="location-event__auditorium" v-html="event.auditorium"/>
        </main>
        <div class="location-event__teacher">
          {{ event.teacher }}
        </div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import events from '../entities/events'

@Component
export default class LocationEvents extends Vue {
  events = events;
}
</script>

<style lang="scss" scoped>
@import "../styles/LocationEvents";
</style>