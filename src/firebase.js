import Vue from "vue"
import firebase from "firebase"
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCbiagxiDaGporRXaGt9cLKUzwAI3ajvv0",
  authDomain: "team-2018.firebaseapp.com",
  projectId: "team-2018",
  storageBucket: "team-2018.appspot.com",
  messagingSenderId: "346909463091",
  appId: "1:346909463091:web:52772989ae3b2929cd4946",
  measurementId: "G-4QXBL13FTM",
}

firebase.initializeApp(firebaseConfig)

// 仮ユーザー情報
const initialUserState = {
  uid: "",
  displayName: "",
  photoURL: "",
}
const $auth = Vue.observable({
  currentUser: { ...initialUserState },
})
firebase.auth().onAuthStateChanged((user) => {
  let state
  if (user) {
    const { uid, displayName, photoURL } = user
    state = {
      uid,
      displayName,
      photoURL,
    }
  } else {
    state = initialUserState
  }
  Object.assign($auth.currentUser, state)
})
Vue.prototype.$auth = $auth
