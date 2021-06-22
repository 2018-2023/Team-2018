<template>
  <div class="login">
    <Form title="Login" :func="signIn" :gFunc="gsignIn" router="/signup/" />
  </div>
</template>

<script>
import Form from "@/components/Form.vue"
import firebase from "firebase"

export default {
  components: {
    Form,
  },
  methods: {
    test(text, password) {
      console.log(text, password)
    },
    signIn(email, password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          alert("signIn!")
          // this.user = user
          this.$router.push("/")
          // this.login_modal = false
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
        .then(() => {
          this.$router.push("/")
        })
    },
  },
}
</script>

<style scoped></style>
