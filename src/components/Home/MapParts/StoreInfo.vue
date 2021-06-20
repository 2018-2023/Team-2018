<template>
  <div>
    <l-marker
      v-for="data in shopData"
      :key="data.id"
      :lat-lng="[data.lat, data.lng]"
    >
      <l-tooltip
        :options="{ permanent: true, interactive: true, direction: 'top' }"
      >
        <div @click="handleToolTipClick(data.id)">
          {{ data.name }} |
          <button v-if="data.liked" @click="cancel(data.id)">★</button>
          <button v-else @click="like(data.id)">☆</button><br />
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
// 非同期処理のライブラリ
import axios from "axios"
// ホットペッパーのレスポンスがXML形式だったので変換するためのライブラリ
import firebase from "firebase"
const xmlToJson = require("xml2js")

// マーカーが表示されないことを回避するために公式から
delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
})

export default {
  props: {
    center: {
      type: Array,
      require: true,
    },
  },
  components: {
    LMarker,
    LTooltip,
  },
  data() {
    return {
      shopData: [],
    }
  },
  methods: {
    handleToolTipClick(id) {
      for (let i = 0; i < this.shopData.length; i++) {
        if (id === this.shopData[i].id) {
          this.shopData[i].showDetail = !this.shopData[i].showDetail
          return
        }
      }
    },
    like(id) {
      for (let i = 0; i < this.shopData.length; i++) {
        if (id === this.shopData[i].id) {
          this.shopData[i].liked = true
          firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .update({
              //likesが配列
              likes: firebase.firestore.FieldValue.arrayUnion({
                id: this.shopData[i].id,
                lat: this.shopData[i].lat,
                lng: this.shopData[i].lng,
                name: this.shopData[i].name,
                genre: this.shopData[i].genre,
                genreCode: this.shopData[i].genreCode,
                address: this.shopData[i].address,
                time: this.shopData[i].time,
                url: this.shopData[i].url,
                photo: this.shopData[i].photo,
              }),
            })
        }
      }
    },

    cancel(id) {
      for (let i = 0; i < this.shopData.length; i++) {
        if (id === this.shopData[i].id) {
          this.shopData[i].liked = false
          firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .update({
              likes: firebase.firestore.FieldValue.arrayRemove({
                id: this.shopData[i].id,
                lat: this.shopData[i].lat,
                lng: this.shopData[i].lng,
                name: this.shopData[i].name,
                genre: this.shopData[i].genre,
                genreCode: this.shopData[i].genreCode,
                address: this.shopData[i].address,
                time: this.shopData[i].time,
                url: this.shopData[i].url,
                photo: this.shopData[i].photo,
              }),
            })
        }
      }
    },
  },
  watch: {
    center: async function () {
      const HOTPEPPER_URL = "/hotpepper/gourmet/v1/"
      const API_KEY = "e9cd52a7ae2c9ea3"
      // const jenre = "G002" // TODO ジャンルを指定する
      const range = "5"
      const count = "100"

      const res = await axios.get(
        `${HOTPEPPER_URL}/?key=${API_KEY}&lat=${this.center[0]}&lng=${this.center[1]}&range=${range}&count=${count}`
      )
      const data = await xmlToJson.parseStringPromise(res.data)

      data.results.shop.forEach((restaurant) => {
        const info = {
          id: restaurant.id[0],
          lat: restaurant.lat[0],
          lng: restaurant.lng[0],
          name: restaurant.name[0],
          genre: restaurant.genre[0].name[0],
          genreCode: restaurant.genre[0].code[0],
          address: restaurant.address[0],
          time: restaurant.open[0],
          url: restaurant.urls[0].pc[0],
          photo: restaurant.photo[0].mobile[0].l[0],
          showDetail: false,
          liked: false,
        }
        this.shopData.push(info)
      })
    },
  },
}
</script>
