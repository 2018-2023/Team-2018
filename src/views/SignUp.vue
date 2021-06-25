<template>
  <div class="signUp">
    <Form
      title="signUp"
      :func="signUp"
      :gFunc="gsignUp"
      toSignUp1=""
      toSignUp2=""
      toSignUp3=""
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
    signUp(email, password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userInfo) => {
          console.log(userInfo.user.uid)
          firebase.firestore().collection("users").doc(userInfo.user.uid).set({
            likeShops: [],
          })
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
        .then((userInfo) => {
          firebase.firestore().collection("users").doc(userInfo.user.uid).set({
            likeShops: [],
          })
          this.$router.push("/")
        })
    },
  },
}
</script>

<style></style>
