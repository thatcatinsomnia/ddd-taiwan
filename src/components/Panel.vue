<template>
  <div class="panel">
    <h3 class="panel__title">{{ county }}</h3>
  </div>
</template>

<script>
export default {
  name: 'Panel',
  props: {
    county: String
  }
};
</script>

<style lang="scss">
.panel {
  width: 40%;
  height: 500px;
  position: absolute;
  top: 20%;
  left: 10%;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);
  border-radius: 0.5rem;

  &__title {
    padding: 2rem;
    font-size: 6em;
    text-align: center;
    color: #fff;
  }
}
</style>
