<template>
  <div class="mypage_container">
    <div class="cards_container">
      <div class="cards">
        <div v-for="datum in data" :key="datum.id">
          <a
            :href="datum.url"
            target="_blank"
            rel="noopener noreferrer"
            class="card"
          >
            <div class="shop_photo">
              <img :src="datum.photo" alt="shopPhoto" />
            </div>
            <div class="shop_info">
              <div class="shop_address">
                {{ datum.address }}
              </div>
              <div class="shop_name">
                {{ datum.name }}<br />
                ({{ datum.genre }})
              </div>
              <div class="shop_time">
                {{ datum.time }}
              </div>
            </div>
          </a>
        </div>
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
      })
  },
}
</script>

<style scoped>
a {
  text-decoration: none;
}

.mypage_container {
  width: 100%;
  background-color: #f5f5f5;
}

.cards_container {
  width: 80%;
  margin: 0 auto;
  background-color: white;
}

.cards {
  width: 80%;
  margin: 0 auto;
  padding: 10rem 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.card {
  display: flex;
  padding: 1rem;
  box-shadow: 5px 5px 5px #e5e5e5;
}

.card:hover {
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
  transform: translateY(-10px);
  transition: 0.3s;
}

.shop_info {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.shop_photo {
  width: 20%;
}

.shop_photo img {
  width: 100%;
  height: 100%;
}

.shop_info {
  width: 80%;
  padding: 1rem 3rem;
}

.shop_address {
  font-size: 12px;
}

.shop_name {
  font-size: 20px;
}

.shop_time {
  font-size: 12px;
}

@media screen and (max-width: 800px) {
  .card {
    flex-direction: column;
  }

  .shop_photo {
    width: 100%;
    height: 15rem;
  }

  .shop_info {
    width: 100%;
    padding: 1rem 0;
  }
  .card:hover {
    box-shadow: 5px 5px 5px #e5e5e5;
    transform: translateY(0px);
    transition: 0;
  }
}
</style>
