<template>
  <div>
    <l-marker
      v-for="data in allShopData"
      :key="data.id"
      :lat-lng="[data.lat, data.lng]"
    >
      <l-tooltip
        :options="{ permanent: true, interactive: true, direction: 'top' }"
      >
        <div>
          {{ data.name }} |
          <!-- いいね -->
          <span v-if="!data.liked" @click="like(data.id)">☆</span>
          <span v-else @click="unLike(data.id)">★</span>
          <!-- 詳細ボタン -->
          <p v-if="!data.showDetail" @click="handleToolTipClick(data.id)">
            詳細を見る
          </p>
          <p v-else @click="handleToolTipClick(data.id)">詳細を閉じる</p>
          <!-- 詳細 -->
          <p v-show="data.showDetail">
            {{ data.genre }}<br />
            {{ data.time }}<br />
            {{ data.address }}<br />
            <a :href="data.url" target="_blank" rel="noopener noreferrer"
              >今すぐ予約！👈</a
            >
          </p>
        </div>
      </l-tooltip>
    </l-marker>
  </div>
</template>

<script>
import { Icon } from "leaflet"
import { LMarker, LTooltip } from "vue2-leaflet"
import firebase from "firebase"
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
      allShopData: [],
    }
  },
  computed: {
    user() {
      return this.$auth.currentUser
    },
  },
  methods: {
    // 詳細の開け閉め
    handleToolTipClick(id) {
      for (let i = 0; i < this.allShopData.length; i++) {
        if (id === this.allShopData[i].id) {
          this.allShopData[i].showDetail = !this.allShopData[i].showDetail
          return
        }
      }
    },
    // いいね
    like(shopId) {
      for (let i = 0; i < this.allShopData.length; i++) {
        if (shopId === this.allShopData[i].id) {
          this.allShopData[i].liked = true
          firebase
            .firestore()
            .collection("users")
            .doc(this.user.uid)
            .update({
              likeShops: firebase.firestore.FieldValue.arrayUnion({
                id: this.allShopData[i].id,
                lat: this.allShopData[i].lat,
                lng: this.allShopData[i].lng,
                name: this.allShopData[i].name,
                genre: this.allShopData[i].genre,
                genreCode: this.allShopData[i].genreCode,
                address: this.allShopData[i].address,
                time: this.allShopData[i].time,
                url: this.allShopData[i].url,
                photo: this.allShopData[i].photo,
              }),
            })
        }
      }
    },
    // いいねの削除
    unLike(shopId) {
      for (let i = 0; i < this.allShopData.length; i++) {
        if (shopId === this.allShopData[i].id) {
          this.allShopData[i].liked = false
          firebase
            .firestore()
            .collection("users")
            .doc(this.user.uid)
            .update({
              likeShops: firebase.firestore.FieldValue.arrayRemove({
                id: this.allShopData[i].id,
                lat: this.allShopData[i].lat,
                lng: this.allShopData[i].lng,
                name: this.allShopData[i].name,
                genre: this.allShopData[i].genre,
                genreCode: this.allShopData[i].genreCode,
                address: this.allShopData[i].address,
                time: this.allShopData[i].time,
                url: this.allShopData[i].url,
                photo: this.allShopData[i].photo,
              }),
            })
        }
      }
    },
    // すでにいいねしていたものを取得
    async loadLikedShops() {
      const ids = await firebase
        .firestore()
        .collection("users")
        .doc(this.user.uid)
        .get()
        .then((doc) => {
          return doc.data()
        })
        .then((data) => {
          return data.likeShops.map((likedShop) => {
            return likedShop.id
          })
        })
      return ids
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

      const ids = await this.loadLikedShops()

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
          liked: ids.includes(restaurant.id[0]),
        }
        this.allShopData.push(info)
      })
    },
  },
}
</script>
