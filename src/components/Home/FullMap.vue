<template>
  <!-- マップ全体 -->
  <l-map :zoom="zoom" :center="center">
    <!-- 表示するタイル持ってくるURL -->
    <map-url />
    <!-- 現在地のピン -->
    <current-position :center="center" />
    <!-- お店のピン -->
    <store-info :center="center" />
  </l-map>
</template>

<script>
import { LMap } from "vue2-leaflet"
import MapUrl from "@/components/Home/MapParts/MapUrl.vue"
import CurrentPosition from "@/components/Home/MapParts/CurrentPosition.vue"
import StoreInfo from "@/components/Home/MapParts/StoreInfo.vue"

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
      zoom: 14,
      center: [0, 0],
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
}
</script>
