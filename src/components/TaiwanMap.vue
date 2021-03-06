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
      
      animateSvg(d3.selectAll('path').nodes());
    };

    const animateSvg = (nodes) => {
        nodes.forEach(node => {
          const totalLength = node.getTotalLength();
          node.style.strokeDasharray = totalLength;
          node.style.strokeDashoffset = totalLength;
          node.classList.add('drawing');
          node.classList.add('is-transparent');

          node.addEventListener('animationend', event => {
            event.target.style.strokeDasharray = 0;
            event.target.style.strokeDashoffset = 0;
            event.target.classList.remove('drawing');
            event.target.classList.remove('is-transparent');
          });
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

    onBeforeMount(async () => {
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

    &:hover {
      fill: $color-golden-light;
    }

    &.is-transparent {
      fill: transparent;

    }

    &.is-active {
      fill: $color-golden;
    }
  }
}

.drawing {
  animation: draw 2400ms linear forwards 320ms, bg 800ms linear 1800ms;
}
</style>
