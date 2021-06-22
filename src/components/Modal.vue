<template>
  <div id="login_container">
    <span class="login_pointer" v-on:click="signOut" v-if="user.uid"
      >Logout</span
    >
    <span class="login_pointer" v-on:click="loginModal" v-else>Login</span>

    <div id="mask" v-show="login_modal" v-on:click="closeModal"></div>
    <!-- ログインモーダル -->
    <section id="loginModal" v-show="login_modal">
      <div class="head_box">
        <h1 class="login_caracter">Login</h1>
        <fa-icon
          icon="times"
          class="close_btn"
          v-on:click="closeModal"
        ></fa-icon>
      </div>
      <div class="input_box">
        <fa-icon :icon="['far', 'envelope']"></fa-icon>
        <input type="text" v-model="login_email" class="login_text" />
      </div>
      <div class="input_box">
        <fa-icon icon="lock" class="two"></fa-icon>
        <input type="text" v-model="login_password" class="login_text two" />
      </div>
      <fa-icon
        icon="plus-square"
        v-on:click="signIn"
        class="submit_icon"
      ></fa-icon>
      <img
        src="@/assets/google.png"
        v-on:click="gsignIn"
        class="google_icon"
        alt="google_icon"
      />
      <div class="toSignUp_box">
        <span
          >まだ登録していない方は<span
            v-on:click="open_signUpaModal"
            class="toSignUp"
            >こちら</span
          >から♪</span
        >
      </div>
    </section>
    <!-- サインアップモーダル -->
    <section id="signUpModal" v-show="signUp_modal">
      <div class="head_box">
        <h1 class="login_caracter">SignUp</h1>
        <fa-icon
          icon="times"
          class="close_btn"
          v-on:click="closeModal"
        ></fa-icon>
      </div>
      <div class="input_box">
        <fa-icon :icon="['far', 'envelope']"></fa-icon>
        <input type="text" v-model="signUp_email" class="login_text" />
      </div>
      <div class="input_box">
        <fa-icon icon="lock" class="two"></fa-icon>
        <input type="text" v-model="signUp_password" class="login_text two" />
      </div>
      <fa-icon
        icon="plus-square"
        v-on:click="signUp"
        class="submit_icon"
      ></fa-icon>
      <img
        src="@/assets/google.png"
        v-on:click="gsignUp"
        class="google_icon"
        alt="google_icon"
      />
    </section>
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  data() {
    return {
      login_modal: false,
      signUp_modal: false,
      // loggedIn: false,
      // notLoggedIn: true,
      login_email: "",
      signUp_email: "",
      login_password: "",
      signUp_password: "",
      // user: null,
    }
  },
  computed: {
    user() {
      return this.$auth.currentUser
    },
  },
  methods: {
    loginModal() {
      this.login_modal = true
    },
    closeModal() {
      this.login_modal = false
      this.signUp_modal = false
    },

    // ログイン
    signIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.login_email, this.login_password)
        .then((user) => {
          alert("signIn!")
          this.user = user
          this.$router.push("/")
          this.login_modal = false
          // this.notLoggedIn = false
          // this.loggedIn = true
        })

        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          alert(errorCode + ":" + errorMessage)
        })
    },
    gsignIn() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((user) => {
          this.user = user
          console.log(user)
          this.$router.push("/")
          this.login_modal = false
          // this.notLoggedIn = false
          // this.loggedIn = true
        })
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert("ログアウトしました")
          this.login_modal = false
          this.$router.push("/")
          // this.loggedIn = false
          // this.notLoggedIn = true
        })
    },

    // サインアップ
    open_signUpaModal() {
      this.signUp_modal = true
    },
    signUp() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.signUp_email, this.signUp_password)
        .then((userInfo) => {
          // console.log(this.$auth.currentUser.uid)
          console.log(userInfo.user.uid)
          firebase.firestore().collection("users").doc(userInfo.user.uid).set({
            likeShops: [],
          })
          // console.log(this.$auth.currentUser.uid)
          // this.user = user
          alert("success!")
          this.$router.push("/")
          this.login_modal = false
          this.signUp_modal = false
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          alert(errorCode + ":" + errorMessage)
        })
    },

    gsignUp() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((user) => {
          console.log(user)
          this.user = user
          this.$router.push("/")
          this.login_modal = false
          this.signUp_modal = false
        })
    },
  },
}
</script>

<style scoped>
.login_pointer {
  font-weight: bold;
  cursor: pointer;
}

#mask {
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  /* cursor: pointer; */
  z-index: 999;
}
#loginModal {
  background: #fff;
  color: #555;
  width: 400px;
  height: 35%;
  /* padding: 40px; */
  border-radius: 4px;
  position: absolute;
  top: 25%;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 1000;
}
.head_box {
  position: relative;
  text-align: right;
  height: 30%;
  background-color: red;
}
.close_btn {
  width: 15px;
  cursor: pointer;
  font-size: 25px;
  margin: 23px 23px 0 0;
}
.close_btn:hover {
  color: red;
}
.login_caracter {
  position: absolute;
  font-size: 1.5rem;
  top: 20px;
  left: 20px;
}
ul {
  list-style: none;
}
/* サインアップ */
.toSignUp_box {
  margin-top: 2.5rem;
  font-size: 0.8rem;
}
.toSignUp {
  color: aqua;
  cursor: pointer;
  text-decoration: underline;
}
#signUpModal {
  background: #fff;
  color: #555;
  width: 400px;
  height: 35%;
  /* padding: 40px; */
  border-radius: 4px;
  position: absolute;
  top: 25%;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 1001;
}
.input_box {
  display: flex;
  width: 70%;
  margin: 0 auto;
}
.login_text {
  display: block;
  margin: 0 auto;
  width: 15rem;
  border-bottom: 1px solid red;
  border-right: none;
  border-left: none;
  border-top: none;
  outline: none;
}
.two {
  margin-top: 2rem;
}
.google_icon {
  width: 30px;
  cursor: pointer;
  position: absolute;
  bottom: 15px;
  right: 15px;
}
.submit_icon {
  cursor: pointer;
  font-size: 25px;
  margin-top: 1rem;
}
.submit_icon:hover {
  color: blue;
}
</style>
