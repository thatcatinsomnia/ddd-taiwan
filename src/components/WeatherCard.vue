<template>
  <div class="card">
    <div class="card__session">
      {{ session }}
      <component
        :is="iconName"
        :key="iconName"
        :style="{ transform: 'scale(2) translateY(1rem)' }"
      />
    </div>

    <div class="card__weather">
      {{ weather.wx.parameter.parameterName }}
    </div>

    <div class="card__temperature">
      {{ weather.minT.parameter.parameterName }}° ~
      {{ weather.maxT.parameter.parameterName }}°
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import moment from 'moment';
import Day from '@/components/Icons/Day';
import Night from '@/components/Icons/Night';
import Rainy from '@/components/Icons/Rainy';
import CloudyDay from '@/components/Icons/CloudyDay';
import CloudyNight from '@/components/Icons/CloudyNight';

export default {
  name: 'WeatherCard',
  components: {
    Day,
    Night,
    Rainy,
    CloudyDay,
    CloudyNight
  },
  props: {
    weather: Object,
    index: Number
  },
  setup(props) {
    const isToday =
      moment(props.weather.wx.startTime).date() === moment().date()
        ? true
        : false;

    const isMorning =
      moment(props.weather.wx.startTime).hours() === 6 ? true : false;

    const session = computed(() => {
      if (isToday && isMorning) {
        return '今日白天';
      } else if (isToday && !isMorning) {
        return '今晚明晨';
      } else if (!isToday && isMorning) {
        return '明日白天';
      } else {
        return '明日晚上';
      }
    });

    const iconName = computed(() => {
      const weather = props.weather.wx.parameter.parameterName;

      if (weather.includes('雨')) {
        return 'Rainy';
      } else if (weather.includes('雲') && isMorning) {
        return 'CloudyDay';
      } else if (weather.includes('雲') && !isMorning) {
        return 'CloudyNight';
      } else if (isMorning) {
        return 'Day';
      } else {
        return 'Night';
      }
    });

    return {
      session,
      iconName
    };
  }
};
</script>

<style lang="scss" scoped>
.card {
  padding: 2rem 3rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 1.6rem;
  background: rgba($color-golden, 0.02);
  box-shadow: 4px 4px 30px -6px rgba(0, 0, 0, 0.08);
  border-radius: 5px;

  & > * {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__session {
    margin-bottom: 4.8rem;
    display: flex;
    align-items: center;
    font-size: 2.4rem;
  }

  &__weather {
    margin-bottom: 2rem;
    font-size: 2rem;
  }

  &__temperature {
    font-size: 3rem;
  }
}
</style>
