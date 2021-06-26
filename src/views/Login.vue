<template>
  <div class="login">
    <Form
      title="Login"
      :func="signIn"
      :gFunc="gsignIn"
      toSignUp1="まだ登録していない方は"
      toSignUp2="こちら"
      toSignUp3="から♪"
    />
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
    signIn(email, password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          alert("signIn!")
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
        .then(() => {
          this.$router.push("/")
        })
    },
  },
}
</script>

<style scoped></style>
