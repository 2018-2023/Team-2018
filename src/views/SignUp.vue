<template>
  <div id="container">
    <div class="login_conatiner">
      <div class="text_container">
        <div class="input_container">
          <input type="email" v-model="email" class="login_text" />
          <input type="password" v-model="password" class="two" />
          <button v-on:click="signUp">登録</button>
          <button v-on:click="gsignUp">Googleで登録</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
export default {
  methods: {
    signUp() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          this.user = user
        })
        .catch()
    },

    gsignUp() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider)
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
  background-color: red;
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
  display: block;
  margin: 0 auto;
  width: 15rem;
  margin-top: 2rem;
}
.submit {
  margin-top: 1.5rem;
}
</style>
