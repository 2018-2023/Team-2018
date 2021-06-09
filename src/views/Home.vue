<template>
  <div class="home-map">
    <!-- マップ全体 -->
    <l-map :zoom="zoom" :center="center">
      <!-- 表示するタイル持ってくるURL -->
      <l-tile-layer :url="url" :attribution="attribution" />
      <!-- 以下、ピンやポップアップの指定(取ってきた緯度・経度の個数分ループさせればいいかも) -->
      <l-marker :lat-lng="center">
        <l-tooltip :options="{ permanent: true, interactive: true }">
          <div @click="handleToolTipClick">
            あなたは今ここにいます。<br />you are here.
            <p v-show="showParagraph">ここにはお店の情報が入ります</p>
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
      center: [0, 0],
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
    // 取得した位置情報を処理する
    success(position) {
      // console.log(position)
      // console.log(this.center)
      this.center = [position.coords.latitude, position.coords.longitude]
      // console.log(this.center)
    },
  },
  mounted() {
    navigator.geolocation.getCurrentPosition(this.success)
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
