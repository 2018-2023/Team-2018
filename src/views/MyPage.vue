<template>
  <div>
    <div class="signed-in-user-profile" v-if="user">
      <div>uid : {{ user.uid }}</div>
      <div>displayName : {{ user.displayName }}</div>

      <div class="signed-in-user-profile__photo">
        <img
          v-bind:src="
            user.photoURL ? user.photoURL : 'https://via.placeholder.com/150'
          "
        />
      </div>
    </div>
    <div v-else>No User Signed In</div>
  </div>
</template>

<script>
// import firebase from "firebase"
export default {
  // ログインしているユーザーを自動で取得
  computed: {
    user() {
      return this.$auth.currentUser
    },
  },
  // いいねした店をfirestoreのlikesから取得して表示
  // created() {
  //   firebase
  //     .firestore()
  //     .collection("users")
  //     .doc(firebase.auth().currentUser.uid)
  //     .get()
  //     .then((doc) => {
  //       if (doc.exists) {
  //         console.lod("DocumentData:", doc.data())
  //       } else {
  //         console.log("nodata")
  //       }
  //     })
  // },

  //Homeに書いたためコメントアウト
  // methods: {
  // get() {
  //   firebase
  //     .firestore()
  //     .collection("users")
  //     .doc(firebase.auth().currentUser.uid)
  //     .get()
  //     .then((doc) => {
  //       if (doc.exists) {
  //         this.likedShop = doc.data()
  //       } else {
  //         console.log("nodata")
  //       }
  //     })
  // },
  // like() {
  //   firebase
  //     .firestore()
  //     .collection("users")
  //     .doc(firebase.auth().currentUser.uid)
  //     .update({
  //       //likesが配列
  //       likes: firebase.firestore.FieldValue.arrayUnion({
  //         name: "sss",
  //         adress: "aaa",
  //         tell: "ddd",
  //         ddd: "kkkk",
  //       }),
  //     })
  // },
  // cancel() {
  //   firebase
  //     .firestore()
  //     .collection("users")
  //     .doc(firebase.auth().currentUser.uid)
  //     .update({
  //       likes: firebase.firestore.FieldValue.arrayRemove({
  //         name: "sss",
  //         adress: "aaa",
  //         tell: "ddd",
  //         ddd: "kkkk",
  //       }),
  //     })
  // },
  // },
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
