<template>
  <div class="container">
    <div class="header">
      <h1 class="header__title">全台天氣資訊</h1>
      <span class="header__hint">請選取地圖</span>
    </div>
    <TaiwanMap @showPanel="showPanel" @closePanel="isShow = false" />

    <transition name="fade" appear>
      <Panel v-if="isShow" :county="pickedCounty" :key="pickedCounty.name" />
    </transition>
  </div>
</template>

<script>
import { ref, reactive, onBeforeMount } from 'vue';
import TaiwanMap from '@/components/TaiwanMap.vue';
import Panel from '@/components/Panel';
import WeatherService from '@/services/WeatherService';

export default {
  name: 'App',
  components: {
    TaiwanMap,
    Panel
  },

  setup() {
    const isShow = ref(false);
    const pickedCounty = reactive({ name: '', weather: [] });

    const weatherData = reactive({});

    const showPanel = county => {
      pickedCounty.name = county;
      isShow.value = true;

      const countyWeather = getCountyWeather(county);
      updateActiveCountyWeather(countyWeather);
    };

    const getCountyWeather = countyName => {
      if (weatherData[countyName]) {
        return weatherData[countyName];
      }

      return (weatherData[countyName] = weatherData.all.find(
        county => county.locationName === countyName
      ));
    };

    // Wx: 天氣現象. weatherElement[0]
    // PoP: 降雨機率 weatherElement[1]
    // MinT: 最低溫度 weatherElement[2]
    // CI: 舒適度 weatherElement[3]
    // MaxT: 最高溫度 weatherElement[4]
    const updateActiveCountyWeather = countyWeather => {
      pickedCounty.weather;
      // there is 3 time sessions to render
      // 0 ~ 2 length is 3
      for (let i = 0; i <= 2; i++) {
        pickedCounty.weather.splice(i, 1, {
          wx: countyWeather.weatherElement[0].time[i],
          pop: countyWeather.weatherElement[1].time[i],
          minT: countyWeather.weatherElement[2].time[i],
          maxT: countyWeather.weatherElement[4].time[i]
        });
      }
    };

    onBeforeMount(async () => {
      weatherData.all = await WeatherService.fetchAll();
    });

    return {
      isShow,
      pickedCounty,
      showPanel
    };
  }
};
</script>

<style lang="scss">
.container {
  height: 100%;
  width: 100%;
  background: $color-background;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
}

.header {
  color: #fff;
  position: absolute;
  top: 8%;
  left: 8%;
  display: flex;
  align-items: baseline;

  &__title {
    opacity: 0;
    font-size: 5rem;
    animation: fade-from-bottom 600ms ease-in-out forwards 1600ms;
  }

  &__hint {
    opacity: 0;
    margin-left: 4rem;
    font-size: 1.6rem;
    animation: fade-from-right 600ms ease-in-out 1600ms, twinkle 2100ms linear infinite 2200ms, ;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 360ms ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateY(5rem);
  opacity: 0;
}


@keyframes fade-from-bottom {
  from {
    transform: translateY(5rem) rotate(-6deg);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}


@keyframes fade-from-right {
  from {
    transform: translateX(5rem);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes twinkle {
  0% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0;
    transform: scale(1.05);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
