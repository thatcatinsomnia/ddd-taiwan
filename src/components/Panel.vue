<template>
  <div class="panel">
    <h3 class="panel__title">{{ county.name }}</h3>
    <div class="panel__body">
      <!-- 
        loop 3 times, because there are 3 time sessions to render
      -->
      <WeatherCard
        :weather="weather"
        :index="index"
        v-for="(weather, index) in county.weather"
        :key="index"
      />
    </div>
  </div>
</template>

<script>
import WeatherCard from '@/components/WeatherCard.vue';

export default {
  name: 'Panel',
  components: {
    WeatherCard
  },
  props: {
    county: Object
  }
};
</script>

<style lang="scss">
.panel {
  width: 65rem;
  height: 42rem;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 20%;
  left: 8%;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);
  border-radius: 0.5rem;

  &__title {
    padding: 2rem;
    font-size: 6em;
    text-align: center;
    color: #fff;
  }

  &__body {
    margin-top: auto;
    padding: 3rem;
    display: flex;
    justify-content: space-around;
    color: #fff;
  }
}
</style>
