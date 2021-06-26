<template>
  <div id="app">
    <div id="nav">
      <div class="title">
        <p class="letter ma">ま</p>
        <p class="letter ti">ち</p>
        <p class="letter ka">か</p>
        <p class="letter do">ど</p>
      </div>

      <div class="menu" v-on:click="clicked = !clicked">
        <span class="line line_01" :class="{ btn_line01: clicked }"></span>
        <span class="line line_02" :class="{ btn_line02: clicked }"></span>
        <span class="line line_03" :class="{ btn_line03: clicked }"></span>
      </div>

      <nav
        class="ssm"
        v-bind:class="{ sm: clicked }"
        v-on:click="clicked = !clicked"
      >
        <router-link to="/" class="smlink" id="Home">Home</router-link>
        <router-link to="/about" class="smlink" id="About">About</router-link>
        <p class="smlink" v-if="user.uid !== ''" @click="signOut">Logout</p>
        <router-link to="/Login" class="smlink" id="Login" v-else
          >Login</router-link
        >
        <router-link to="/my-page" class="smlink" id="mypage"
          >mypage</router-link
        >
      </nav>
      <nav class="pc">
        <router-link to="/" class="link" id="Home">Home</router-link>
        <router-link to="/about" class="link" id="About">About</router-link>
        <p class="link" v-if="user.uid !== ''" @click="signOut">Logout</p>
        <router-link to="/Login" class="link" id="Login" v-else
          >Login</router-link
        >
        <router-link to="/my-page" class="link" id="mypage">mypage</router-link>
      </nav>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  data() {
    return {
      exist: false,
      clicked: false,
    }
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert("ログアウトしました")
          this.login_modal = false
          this.$router.push("/Login")
        })
    },
  },
  computed: {
    user() {
      return this.$auth.currentUser
    },
  },
}
</script>

<style scoped>
/* #app {
  width: 100%;
  position: fixed;
} */
#nav {
  height: 100px;
  background-color: rgba(105, 193, 228, 0.5);
  background-blend-mode: lighten;
  background-size: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  position: fixed;
  z-index: 1000;
}
.letter {
  font-size: 40px;
  font-family: cursive;
  padding-right: 15px;
}

.menu {
  /* height: 100%;
  width: 100px;
  padding: 30px; */
  display: none;
  /* cursor: pointer; */
}
.line {
  position: absolute;
  top: 0;
  right: 16px;
  width: 45px;
  height: 2px;
  background: #333333;
  text-align: center;
}
.line_01 {
  top: 35px;
  transition: 0.4s ease;
}

.line_02 {
  top: 45px;
  transition: 0.4s ease;
}

.line_03 {
  top: 55px;
  transition: 0.4s ease;
}

.btn_line01 {
  transform: translateY(10px) rotate(-45deg);
  transition: 0.4s ease;
}
.btn_line02 {
  transition: 0.4s ease;
  opacity: 0;
}
.btn_line03 {
  transform: translateY(-10px) rotate(45deg);
  transition: 0.4s ease;
}

/* nav=header */

.smlink {
  padding: 30px;
  border: 1px solid black;
  font-size: 20px;
}
.ssm {
  display: none;
}
.pc {
  display: flex;
}
.link {
  display: flex;
  padding: 0px 20px;
  align-items: center;
  font-family: cursive;
  cursor: pointer;
  border-right: 1px solid black;
  background-color: rgba(105, 193, 228, 0.5);
}

.link:hover {
  background-color: rgba(105, 193, 228, 1);
  transition: 0.5s;
}

#Home {
  border-left: 1px solid black;
}

.title {
  display: flex;
  align-items: center;
  flex-grow: 1;
  padding-left: 30px;
}

#nav a {
  font-weight: bold;
  color: black;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  font-weight: bold;
}

/* #menu-check {
  display: none;
} */

@media (max-width: 768px) {
  .pc {
    display: none;
  }
  /* #humburger */
  .menu {
    display: block;
    padding: 40px;
    cursor: pointer;
    background-color: rgba(105, 193, 228, 0.5);
  }

  .menu:hover {
    background-color: rgba(105, 193, 228, 1);
    transition: 0.5s;
  }

  .title {
    justify-content: center;
  }

  .sm {
    display: flex;
    top: 100px;
    position: absolute;
    flex-direction: column;
    width: 100%;
    background-color: rgba(105, 193, 228, 0.5);
    z-index: 1000;
  }
  .smlink:hover {
    background-color: rgba(105, 193, 228, 0.5);
    transition: 0.5s;
  }
}
</style>
