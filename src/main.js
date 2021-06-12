import Vue from "vue"
import App from "./App.vue"
import router from "./router"
// 地図ライブラリの導入
import "leaflet/dist/leaflet.css"
// resetCSSを適用する
import "@/global.css"

// FontAwesomeを使うための処理
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { far } from "@fortawesome/free-regular-svg-icons"
library.add(fas, fab, far)

Vue.component("fa-icon", FontAwesomeIcon)
// fontAwesome終

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app")
