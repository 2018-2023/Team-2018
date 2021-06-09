<template>
  <div class="home-map">
    <!-- マップ全体 -->
    <l-map :zoom="zoom" :center="center">
      <!-- 表示するタイル持ってくるURL -->
      <l-tile-layer :url="url" :attribution="attribution" />
      <!-- 以下、ピンやポップアップの指定(取ってきた緯度・経度の個数分ループさせればいいかも) -->
      <l-marker :lat-lng="withTooltip">
        <l-tooltip :options="{ permanent: true, interactive: true }">
          <div @click="handleToolTipClick">
            I am a tooltip
            <p v-show="showParagraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
              Donec finibus semper metus id malesuada.
            </p>
          </div>
        </l-tooltip>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import { latLng, Icon } from "leaflet"
import { LMap, LTileLayer, LMarker, LTooltip } from "vue2-leaflet"

// マーカーが表示されないことを回避するために公式から
delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
})

export default {
  name: "Example",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
  },
  data() {
    return {
      // 初期値
      zoom: 13,
      center: latLng(35.6811, 139.7672),
      // 今表示してるタイルのURL
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      withTooltip: latLng(35.6811, 139.7672),
      showParagraph: false,
    }
  },
  methods: {
    handleToolTipClick() {
      this.showParagraph = !this.showParagraph
    },
  },
}

// latLngメソッドの緯度・経度に現在の位置情報・店の緯度経度をそれぞれ入れればできるのかも
</script>

<style>
.home-map {
  height: 100vh;
  width: 100vw;
}
</style>
