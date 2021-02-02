<template>
  <div class="card">
    <div class="card__time">
      {{ startTime }} ~
      <!-- <span class="card__to">to</span> -->
      {{ endTime }}
    </div>

    <div class="card__temperature">
      {{ weather.minT.parameter.parameterName }}度 ~
      {{ weather.maxT.parameter.parameterName }}度
    </div>

    <div class="card__weather">
      {{ weather.wx.parameter.parameterName }}
    </div>

    <!-- 


    -->
  </div>
</template>

<script>
import { computed } from 'vue';
import moment from 'moment';

export default {
  name: 'WeatherCard',
  props: {
    weather: Array,
    index: Number
  },
  setup(props) {
    const startTime = computed(() => {
      return moment(props.weather.wx.startTime).format('MM/DD HH:mm');
    });

    const endTime = computed(() => {
      return moment(props.weather.wx.endTime).format('MM/DD HH:mm');
    });

    return {
      startTime,
      endTime
    };
  }
};
</script>

<style lang="scss" scoped>
.card {
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 1.6rem;

  & > * {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__time {
    font-size: 1.6rem;
  }

  &__to {
    display: block;
    text-align: center;
  }

  &__temperature {
    font-size: 2.6rem;
  }

  &__weather {
    font-size: 2.8rem;
  }
}
</style>
