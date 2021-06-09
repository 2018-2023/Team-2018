<template>
  <div class="home-map">
    <!-- マップ全体 -->
    <l-map :zoom="zoom" :center="center">
      <!-- 表示するタイル持ってくるURL -->
      <l-tile-layer :url="url" :attribution="attribution" />
      <!-- 以下、ピンやポップアップの指定(取ってきた緯度・経度の個数分ループさせればいいかも) -->
      <l-marker :lat-lng="withPopup">
        <l-popup>
          <div @click="innerClick">
            I am a popup
            <p v-show="showParagraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
              Donec finibus semper metus id malesuada.
            </p>
          </div>
        </l-popup>
      </l-marker>
      <l-marker :lat-lng="withTooltip">
        <l-tooltip :options="{ permanent: true, interactive: true }">
          <div @click="showLongText">
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
import { latLng } from "leaflet"
import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from "vue2-leaflet"

export default {
  name: "Example",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
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
      withPopup: latLng(35.6811, 139.7672),
      withTooltip: latLng(35.6811, 139.7672),
      currentCenter: latLng(35.6811, 139.7672),
      showParagraph: false,
    }
  },
  methods: {
    showLongText() {
      this.showParagraph = !this.showParagraph
    },
    innerClick() {
      alert("Click!")
    },
  },
}
</script>

<style>
.home-map {
  height: 100vh;
  width: 100vw;
}
</style>
