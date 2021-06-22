<template>
  <div>
    <div v-for="datum in data" :key="datum.id">
      <a :href="datum.url">{{ datum.url }}</a>
      {{ datum.photo }}
      <img :src="datum.photo" alt="shopPhoto" />
    </div>
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  data() {
    return {
      data: [],
    }
  },
  computed: {
    user() {
      return this.$auth.currentUser
    },
  },
  created() {
    firebase
      .firestore()
      .collection("users")
      .doc(this.user.uid)
      .get()
      .then((doc) => {
        return doc.data()
      })
      // .then((data) => {
      //   this.data.push(data.likeShops)
      //   console.log(this.data)
      // })
      .then((data) => {
        data.likeShops.forEach((likedShop) => {
          this.data.push(likedShop)
        })
        console.log(this.data)
      })

    // this.data.push(data.likeShops)
  },
}
</script>

<style scoped>
.signed-in-user-profile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.signed-in-user-profile__photo {
  height: 10rem;
}
.signed-in-user-profile__photo img {
  height: 100%;
  object-fit: contain;
}
</style>
