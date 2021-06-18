<template>
  <!-- マップ全体 -->
  <l-map :zoom="zoom" :center="center">
    <!-- 表示するタイル持ってくるURL -->
    <map-url />
    <!-- 現在地のピン -->
    <current-position :center="center" />
    <!-- お店のピン -->
    <store-info :shopData="shopData" />
  </l-map>
</template>

<script>
import { LMap } from "vue2-leaflet"
import MapUrl from "@/components/Home/MapParts/MapUrl.vue"
import CurrentPosition from "@/components/Home/MapParts/CurrentPosition.vue"
import StoreInfo from "@/components/Home/MapParts/StoreInfo.vue"

// 非同期処理のライブラリ
import axios from "axios"
// ホットペッパーのレスポンスがXML形式だったので変換するためのライブラリ
const xmlToJson = require("xml2js")

export default {
  components: {
    LMap,
    MapUrl,
    CurrentPosition,
    StoreInfo,
  },
  data() {
    return {
      // 初期値
      zoom: 13,
      center: [0, 0],
      shopData: [],
    }
  },
  methods: {
    // 取得した位置情報からlat,longを取り出す
    success(position) {
      this.center = [position.coords.latitude, position.coords.longitude]
    },
  },
  created() {
    // 位置情報を取得する
    navigator.geolocation.getCurrentPosition(this.success)
  },
  watch: {
    // 現在地が変わったら(いまのとこcreatedが終わったら)
    center: async function () {
      const res = await axios.get(
        `/hotpepper/gourmet/v1/?key=e9cd52a7ae2c9ea3&lat=${this.center[0]}&lng=${this.center[1]}.52&range=5&count=100`
      )
      const data = await xmlToJson.parseStringPromise(res.data)
      data.results.shop.forEach((restaurant) => {
        const info = {
          lat: restaurant.lat[0],
          lng: restaurant.lng[0],
          name: restaurant.name[0],
          genre: restaurant.genre[0].name[0],
          address: restaurant.address[0],
          time: restaurant.open[0],
          url: restaurant.urls[0].pc[0],
          photo: restaurant.photo[0].mobile[0].l[0],
          showDetail: false,
        }
        this.shopData.push(info)
      })
    },
  },
}
</script>
