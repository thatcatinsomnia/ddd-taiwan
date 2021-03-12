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
    let type = '';

    /* eslint-disable vue/no-setup-props-destructure */
    const timeDesc = {
      'TEM': '今日凌晨',
      'TD': '今日白天',
      'TN': '今晚明晨',
      'TM': '明日白天',
      'TMN':'明日晚上',
    };

    const { startTime, endTime } = props.weather.wx;
    const isStartToday = moment(startTime).date() === moment().date();
    const isEndToday = moment(endTime).date() === moment().date();
    const startHour = moment(startTime).hours();
    const endHour = moment(endTime).hours();
    const currentHour = moment().hours();

    if (startHour === 18 && endHour === 6 && isStartToday) {
      // tonight
      type = 'TN';
      if (currentHour >= 0 && currentHour < 12) {
        timeDesc['TN'] = `今日晚上`; 
      } else {
        timeDesc['TN'] = `今晚明晨`; 
      }
    } else if (startHour === 6 && endHour === 18 && !isStartToday && !isEndToday) {
      // tomorrow
      type = 'TM';
    } else if (startHour === 12 && endHour === 18 && isStartToday && isEndToday) {
      // today
      type = 'TD'
    } else if (startHour === 18 && endHour === 6 && !isStartToday && !isEndToday) {
      // tomorrow night
      type = 'TMN';
    } else if (startHour === 0 && endHour === 6 && isStartToday && isEndToday) {
      // today early morning
      type = 'TEM'
    }
  
    const session = computed(() => {
      return timeDesc[type];
    });

    const iconName = computed(() => {
      const weather = props.weather.wx.parameter.parameterName;

      if (weather.includes('雨')) {
        return 'Rainy';
      } else if (weather.includes('雲') && startHour === 6 || startHour === 12) {
        return 'CloudyDay';
      } else if (weather.includes('雲') && startHour !== 6) {
        return 'CloudyNight';
      } else if (startHour === 6) {
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
