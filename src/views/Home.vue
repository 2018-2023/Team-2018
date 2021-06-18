<template>
  <div class="home-map">
    <!-- マップ全体 -->
    <l-map :zoom="zoom" :center="center">
      <!-- 表示するタイル持ってくるURL -->
      <l-tile-layer :url="url" :attribution="attribution" />
      <!-- 現在地のピン -->
      <l-circle-marker
        :lat-lng="center"
        :radius="circle.radius"
        :color="circle.color"
      />
      <!-- 以下、お店のピン -->
      <l-marker
        v-for="(data, i) in shopData"
        :key="i"
        :lat-lng="[data.lat, data.lng]"
      >
        <l-tooltip
          :options="{ permanent: true, interactive: true, direction: 'top' }"
        >
          <div @click="handleToolTipClick(i)">
            {{ data.name }} | <button v-if="liked" @click="like">☆</button>
            <button v-else @click="cansel">★</button><br />
            <!-- いいねbutton追加 -->
            <p v-show="data.showDetail">
              {{ data.genre }}<br />
              {{ data.time }}<br />
              {{ data.url }}
            </p>
          </div>
        </l-tooltip>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
// Open street Mapの読み込み
import { Icon } from "leaflet"
import {
  LMap,
  LTileLayer,
  LMarker,
  LTooltip,
  LCircleMarker,
} from "vue2-leaflet"

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

import firebase from "firebase" //いいね追加

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
    LCircleMarker,
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
      circle: {
        radius: 10,
        color: "red",
      },
      // 追加
      shopData: [],

      liked: false,
    }
  },
  methods: {
    handleToolTipClick(index) {
      this.shopData[index].showDetail = !this.shopData[index].showDetail
    },
    // 取得した位置情報を処理する
    success(position) {
      this.center = [position.coords.latitude, position.coords.longitude]
    },
    // いいね機能
    like() {
      ;(this.liked = true),
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .update({
            //likesが配列
            likes: firebase.firestore.FieldValue.arrayUnion({
              name: this.data.name,
              jenre: this.data.jenre,
              time: this.data.time,
            }),
          })
    },
    //いいね取り消し
    cancel() {
      ;(this.liked = false),
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .update({
            likes: firebase.firestore.FieldValue.arrayRemove({
              name: this.data.name,
              jenre: this.data.jenre,
              time: this.data.time,
            }),
          })
    },
    //いいね機能ここまで
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
      data.results.shop.forEach((restaurant) => {
        // console.log(restaurant)
        const info = {
          lat: restaurant.lat[0],
          lng: restaurant.lng[0],
          name: restaurant.name[0],
          genre: restaurant.genre[0].name[0],
          url: restaurant.urls[0].pc[0],
          photo: restaurant.photo[0].mobile[0].l[0],
          time: restaurant.open[0],
          showDetail: false,
        }
        this.shopData.push(info)
      })
      console.log(this.shopData)
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
