<template>
  <div id="container">
    <div class="login_conatiner">
      <div class="text_container">
        <div class="input_container">
          <input type="text" v-model="email" class="login_text" />
          <input type="text" v-model="password" class="login_text two" />
          <button v-on:click="signIn">サインイン</button>
          <button v-on:click="gsignIn">Googleサインイン</button>
          <button v-on:click="signOut">サインアウト</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase"

export default {
  data: function () {
    return {
      email: "",
      passowrd: "",
    }
  },
  methods: {
    signIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
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
  },
}
</script>

<style scoped>
#container {
  padding: 2em;
}
.login_conatiner {
  width: 80%;
  height: 30em;
  border: 1px solid red;
  margin: 0 auto;
  /* background-color: red; */
}
.text_container {
  width: 80%;
  height: 80%;
  margin: 0 auto;
  position: relative;
  top: 50%;
  -webkit-transform: translateY(-50%); /* Safari用 */
  transform: translateY(-50%);
  background-color: blue;
}
.input_container {
  background-color: burlywood;
  position: relative;
  top: 50%;
  -webkit-transform: translateY(-50%); /* Safari用 */
  transform: translateY(-50%);
  padding: 2rem;
}
.login_text {
  display: block;
  margin: 0 auto;
  width: 15rem;
  /* margin-top: 3rem; */
}
.two {
  margin-top: 2rem;
}
.submit {
  margin-top: 1.5rem;
}
</style>
