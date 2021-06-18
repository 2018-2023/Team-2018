<template>
  <div>
    <l-marker
      v-for="(data, i) in shopData"
      :key="i"
      :lat-lng="[data.lat, data.lng]"
    >
      <l-tooltip
        :options="{ permanent: true, interactive: true, direction: 'top' }"
      >
        <div @click="handleToolTipClick(i)">
          {{ data.name }} | ☆<br />
          <p v-show="data.showDetail">
            {{ data.genre }}<br />
            {{ data.time }}<br />
            {{ data.address }}
          </p>
        </div>
      </l-tooltip>
    </l-marker>
  </div>
</template>

<script>
import { Icon } from "leaflet"
import { LMarker, LTooltip } from "vue2-leaflet"

// マーカーが表示されないことを回避するために公式から
delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
})

export default {
  props: {
    shopData: {
      type: Array,
      require: true,
    },
  },
  components: {
    LMarker,
    LTooltip,
  },
  methods: {
    handleToolTipClick(index) {
      this.shopData[index].showDetail = !this.shopData[index].showDetail
    },
  },
}
</script>
