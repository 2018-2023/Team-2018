import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import About from "../views/About.vue"
import SignUp from "../views/SignUp.vue"
import Login from "../views/Login.vue"
import Detail from "../views/Detail.vue"
import MyPage from "../views/MyPage.vue"
import firebase from "firebase"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/my-page",
    name: "MyPage",
    component: MyPage,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/detail",
    name: "Detail",
    component: Detail,
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

let isSignedIn = () => {
  return firebase.auth().currentUser
}

router.beforeEach((to, from, next) => {
  if (to.name === "MyPage" && !isSignedIn()) {
    next("/")
  } else {
    next()
  }
})

export default router
