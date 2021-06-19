<template>
  <l-tile-layer :url="url" :attribution="attribution" />
</template>

<script>
import { LTileLayer } from "vue2-leaflet"

export default {
  components: {
    LTileLayer,
  },
  data() {
    return {
      // 今表示してるタイルのURL
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      // コピーライト
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }
  },
}
</script>
