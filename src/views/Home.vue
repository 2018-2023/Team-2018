<template>
  <div class="home-map">
    <!-- マップ全体 -->
    <l-map :zoom="zoom" :center="center">
      <!-- 表示するタイル持ってくるURL -->
      <l-tile-layer :url="url" :attribution="attribution" />
      <!-- 現在地のピン -->
      <l-marker :lat-lng="center">
        <l-popup>
          <div @click="handlePopUpClick">
            あなたは今ここにいます。<br />you are here.
            <p v-show="showParagraph">ここにはお店の情報が入ります</p>
          </div>
        </l-popup>
      </l-marker>
      <!-- 以下、お店のピン -->
      <l-marker
        v-for="(data, num) in shopData"
        :key="num"
        :lat-lng="[data.lat, data.lng]"
      >
        <l-tooltip
          :options="{ permanent: true, interactive: true, direction: 'top' }"
        >
          <div @click="handlePopUpClick">
            {{ data.name }}<br />
            <p v-show="showParagraph">ここにはお店の情報が入ります、いいね</p>
          </div>
        </l-tooltip>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
// Open street Mapの読み込み
import { Icon } from "leaflet"
import { LMap, LTileLayer, LMarker, LTooltip, LPopup } from "vue2-leaflet"
// 非同期処理のライブラリ
import axios from "axios"
// ホットペッパーのレスポンスがXML形式だったので変換するためのライブラリ
const xmlToJson = require("xml2js")

// マーカーが表示されないことを回避するために公式から
delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
})

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
    LPopup,
  },
  data() {
    return {
      // 初期値
      zoom: 13,
      center: [0, 0],
      // 今表示してるタイルのURL
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      // コピーライトの掲示
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',

      // 追加
      showParagraph: false,
      shopData: [],
    }
  },
  methods: {
    handlePopUpClick() {
      this.showParagraph = !this.showParagraph
    },
    // 取得した位置情報を処理する
    success(position) {
      this.center = [position.coords.latitude, position.coords.longitude]
    },
  },
  created() {
    // 現在地を取得する
    navigator.geolocation.getCurrentPosition(this.success)
  },
  watch: {
    // 現在地が変わったら(いまのとこcreatedが終わったら)
    center: async function () {
      const res = await axios.get(
        `/hotpepper/gourmet/v1/?key=e9cd52a7ae2c9ea3&lat=${this.center[0]}&lng=${this.center[1]}.52&range=5&count=100`
      )
      const data = await xmlToJson.parseStringPromise(res.data)
      // console.log(data)
      data.results.shop.forEach((restaurant) => {
        console.log(restaurant)
        const info = {
          lat: restaurant.lat[0],
          lng: restaurant.lng[0],
          name: restaurant.name[0],
        }
        this.shopData.push(info)
      })
      // console.log(this.shopData)

      // メモ
      // const res2 = await fetch(
      //   `/hotpepper/gourmet/v1/?key=e9cd52a7ae2c9ea3&lat=${this.center[0]}&lng=${this.center[1]}.52&range=5&order=4`
      // )
      // console.log(res2)
      // const data2 = await res2.json()
      // console.log(data2)
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
