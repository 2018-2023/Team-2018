<template>
  <div id="mypage_container">
    <div class="mypage_home">
      <div v-for="datum in data" :key="datum.id" class="each_box">
        <a :href="datum.url" target="_blank" rel="noopener noreferrer">
          <div class="each_shop_box">
            <img :src="datum.photo" alt="shopPhoto" class="shop_photo" />
            <ul>
              <li>
                <div class="text_place">
                  <span class="shop_address"> {{ datum.address }}</span>
                </div>
              </li>
              <li>
                <div class="text_place">
                  <span class="shop_name">
                    {{ datum.name }}
                  </span>
                  <span class="shop_genre"> ({{ datum.genre }}) </span>
                </div>
              </li>
              <li>
                <div class="text_place">
                  <span class="shop_time"> {{ datum.time }}</span>
                </div>
              </li>
            </ul>
          </div>
        </a>
      </div>
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
      .then((data) => {
        data.likeShops.forEach((likedShop) => {
          this.data.push(likedShop)
        })
        console.log(this.data)
      })
  },
}
</script>

<style scoped>
#mypage_container {
  width: 100%;
  /* height: 100vh; */
  padding: 100px 0 100px 0;
  /* position: relative; */
  background-color: #f5f5f5;
}
.mypage_home {
  width: 70%;
  /* height: 80%; */
  margin: 0 auto;
  /* position: absolute; */
  background-color: white;
  /* top: 10%; */
  /* left: 15%; */
}
.each_box {
  width: 100%;
  height: 200px;
  /* background-color: red; */
  margin: 0 auto;
  /* margin-top: 30px; */
  position: relative;
}
.each_box:first-child {
  /* background-color: blue; */
  margin-top: 0px;
}
.each_box::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -1px; /*線の上下位置*/
  display: inline-block;
  width: 70%; /*線の長さ*/
  height: 1px; /*線の太さ*/
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%); /*位置調整*/
  background-color: black; /*線の色*/
  border-radius: 2px; /*線の丸み*/
}
.each_box::before:last-child {
  display: none;
}
.each_shop_box {
  width: 90%;
  height: 150px;
  position: absolute;
  left: 5%;
  top: 25px;
  box-shadow: 2px 2px 4px #e5e5e5;
  display: flex;
}
.each_shop_box:hover {
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
  transform: translateY(-10px);
  transition-duration: 0.5s;
}
.shop_photo {
  width: 30%;
  height: 150px;
}
ul {
  width: 70%;
  height: 150px;
  list-style: none;
}
li {
  width: 100%;
  /* height: 25%; */
  position: relative;
}
li:first-child {
  height: 20%;
}
li:nth-child(2) {
  height: 50%;
}
li:last-child {
  height: 30%;
}
.text_place {
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
}
.shop_name {
  display: block;
  font-size: 1.2rem;
}
.shop_genre {
  font-size: 0.8rem;
}
.shop_address {
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.5);
}
.shop_time {
  font-size: 0.3rem;
  color: rgba(0, 0, 0, 0.5);
}

@media screen and (max-width: 450px) {
  .mypage_home {
    width: 90%;
  }
  .each_shop_box:hover {
    box-shadow: 2px 2px 4px #e5e5e5;
    transform: translateY(0);
    transition-duration: none;
  }
  .shop_name {
    font-size: 0.8rem;
  }
  .shop_genre {
    font-size: 0.6rem;
  }
  .shop_address {
    font-size: 0.4rem;
  }
  .shop_time {
    font-size: 0.1rem;
  }
}
</style>
