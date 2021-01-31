<template>
  <svg class="taiwan" @click.self="removeHighlight(), closePanel()"></svg>
</template>

<script>
import { reactive, onBeforeMount, onMounted } from 'vue';
import * as topojson from 'topojson-client';
import * as d3 from 'd3';
import taiwan_county from '../../data/taiwan_county.json';

export default {
  name: 'TaiwanMap',
  emits: ['showPanel', 'closePanel'],
  setup(props, { emit }) {
    const taiwan = reactive({
      counties: []
    });

    const map = reactive({
      size: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      projection: {},
      path: {}
    });

    const parseCountyData = () => {
      taiwan.counties = topojson.feature(
        taiwan_county,
        taiwan_county.objects['COUNTY_MOI_1090820']
      );
    };

    const drawMap = () => {
      map.projection = d3
        .geoMercator()
        .fitSize([map.size.width, map.size.height], taiwan.counties);

      map.path = d3.geoPath().projection(map.projection);

      d3.select('.taiwan')
        .selectAll('path')
        .data(taiwan.counties.features)
        .enter()
        .append('path')
        .classed('taiwan__county', true)
        .attr('d', map.path)
        .attr('data-name', data => data.properties['COUNTYNAME'])
        .attr('data-eng', data => data.properties['COUNTYENG'])
        .on('click', event => {
          closePanel();

          d3.select('.taiwan__county.is-active').classed('is-active', false);
          d3.select(event.target).classed('is-active', true);

          const countyName = event.target.getAttribute('data-name');
          emit('showPanel', countyName);
        });
    };

    const removeHighlight = () => {
      d3.select('.taiwan__county.is-active').classed('is-active', false);
    };

    const closePanel = () => {
      emit('closePanel');
    };

    onMounted(() => {
      drawMap();
    });

    onBeforeMount(() => {
      parseCountyData();
    });

    return {
      taiwan,
      removeHighlight,
      closePanel
    };
  }
};
</script>

<style lang="scss">
.taiwan {
  width: 100%;
  height: 100%;
  transform: translateX(22%);

  &__county {
    cursor: pointer;
    stroke: $color-golden;
    fill: lighten($color-background, 5%);
    transition: all 260ms ease-in-out;

    &:hover {
      fill: $color-golden-light;
    }

    &.is-active {
      fill: $color-golden;
    }
  }
}
</style>