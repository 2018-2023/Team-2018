<template>
  <div id="about_container">
    <span class="about_pointer" v-on:click="aboutModal">モーダル</span>
    <div id="mask" v-show="showModal" v-on:click="closeModal"></div>
    <!-- ログインモーダル -->
    <section id="loginModal" v-show="showModal">
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
        <input type="text" v-model="email" class="login_text" />
      </div>
      <div class="input_box">
        <fa-icon icon="lock" class="two"></fa-icon>
        <input type="text" v-model="password" class="login_text two" />
      </div>
      <!-- <ul>
        <li>
          <fa-icon :icon="['far', 'envelope']"></fa-icon>
          <input type="text" v-model="email" class="login_text" />
          <div></div>
        </li>
        <li>
          <fa-icon icon="lock"></fa-icon>
          <input type="text" v-model="password" class="login_text" />
        </li>
      </ul> -->
      <button v-on:click="signIn">サインイン</button>
      <button v-on:click="gsignIn">Googleサインイン</button>
      <button v-on:click="signOut">サインアウト</button>
      <div>
        <span
          >まだ登録していない方は<span
            v-on:click="open_signUpModal"
            class="toSignUp"
            >こちら</span
          >から♪</span
        >
      </div>
    </section>
    <!-- サインアップモーダル -->
    <section id="signUpModal" v-show="signUpModal">
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
        <input type="text" v-model="email" class="login_text" />
      </div>
      <div class="input_box">
        <fa-icon icon="lock" class="two"></fa-icon>
        <input type="text" v-model="password" class="login_text two" />
      </div>
      <!-- <ul>
        <li><input type="text" v-model="email" class="login_text" /></li>
        <li>
          <input type="text" v-model="password" class="login_text" />
        </li>
      </ul> -->
      <button v-on:click="signUp">登録</button>
      <button v-on:click="gsignUp">Googleで登録</button>
    </section>
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  data() {
    return {
      showModal: false,
      signUpModal: false,
      login_email: "",
      signUp_email: "",
      login_password: "",
      signUp_password: "",
      user: null,
    }
  },
  methods: {
    aboutModal() {
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
      this.signUpModal = false
    },
    signIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.login_email, this.login_password)
        .then((user) => {
          alert("signIn!")
          console.log(user)
          this.$router.push("/")
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
        })
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.user = null
        })
    },
    // signUp
    open_signUpModal() {
      this.signUpModal = true
    },
    signUp() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.signUp_email, this.signUp_password)
        .then((user) => {
          console.log(user)
          alert("success!")
          this.$router.push("/")
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
        })
    },
  },
}
</script>

<style scoped>
.about_pointer {
  font-weight: bold;
  cursor: pointer;
  /* text-decoration: underline; */
}

#mask {
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 999;
}
/* #mask.hidden {
  display: none;
} */
#loginModal {
  background: #fff;
  color: #555;
  width: 400px;
  height: 30%;
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
  /* display: flex; */
  position: relative;
  text-align: right;
  height: 30%;
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
.toSignUp {
  color: aqua;
  cursor: pointer;
  text-decoration: underline;
}
#signUpModal {
  background: #fff;
  color: #555;
  width: 400px;
  height: 30%;
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
  /* margin-top: 3rem; */
}
/* .login_text:last-child {
  margin-top: 2rem;
} */
.two {
  margin-top: 2rem;
}
</style>
