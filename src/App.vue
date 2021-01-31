<template>
  <div class="container">
    <TaiwanMap @showPanel="showPanel" @closePanel="isShow = false" />

    <transition name="fade" appear>
      <Panel v-if="isShow" :county="state.county" :key="state.county" />
    </transition>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import TaiwanMap from '@/components/TaiwanMap.vue';
import Panel from '@/components/Panel';

export default {
  name: 'App',
  components: {
    TaiwanMap,
    Panel
  },
  setup() {
    const isShow = ref(false);
    const state = reactive({ county: '' });

    const showPanel = county => {
      console.log(county);
      state.county = county;
      isShow.value = true;
    };
    return {
      isShow,
      state,
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

.fade-enter-active,
.fade-leave-active {
  transition: all 300ms ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateY(5rem);
  opacity: 0;
}
</style>
