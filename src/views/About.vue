<template>
  <div class="container">
    <div class="images">
      <img
        src="https://rimage.hitosara.com/gg/image/0010002565/0010002565F1_551x413y.jpg"
        width="23%"
        height="200x"
      />
      <img
        src="https://blog.pokke.in/wp-content/uploads/2017/11/shutterstock_85472272-min-1024x614.jpg"
        width="23%"
        height="200px"
      />
      <img
        src="https://cdn.clipkit.co/tenants/550/item_images/images/000/008/432/large/a3f447a7-6a86-446c-aed2-63e350fc4c54.jpg?1614815422"
        width="23%"
        height="200px"
      />
      <img
        src="https://d1d37e9z843vy6.cloudfront.net/jp/images/3697500/296d9653db7217b7a840f65d48f78137034cde02.jpeg"
        width="23%"
        height="200px"
      />
      <img
        src="https://blog.pokke.in/wp-content/uploads/2017/12/shutterstock_563091901-min.jpg"
        width="23%"
        height="200px"
      />

      <img
        src="https://tblg.k-img.com/restaurant/images/Rvw/131940/320x320_square_131940742.jpg"
        width="23%"
        height="200px"
      />
      <img
        src="https://cdn.michill.jp/img/articles/2004/3.jpg"
        width="23%"
        height="200px"
      />
      <img
        src="https://image.excite.co.jp/jp/erecipe/recipe_thumb/0/f/0f245b6fe41b037c46a1b41771acc863/h/800/203609157a63ee8ffab5a5febd77031e.jpeg"
        width="23%"
        height="200px"
      />
    </div>
    <div class="about">
      <h1>〜自分の知らない世界が実は身近に〜</h1>
      <p>まちかどは近くの外国料理店を手軽に調べられるアプリです</p>
      <p>新しい発見が実はすぐそこにあるかもしれません</p>
    </div>
    <div class="more">
      <h1>アカウントを登録してまちかどを使いこなそう</h1>
      <p>
        <router-link to="/signup">アカウントを登録</router-link
        >すると、お気に入りのお店をマイページに登録することができます
      </p>
    </div>
    <div class="go">
      <h1>身近にある海外を楽しもう!</h1>
      <router-link to="/">探し行く</router-link>
    </div>
  </div>
</template>
<style scoped>
.container {
  padding-top: 120px;
}
.images img {
  margin: 5px;
}
.about h1 {
  padding: 100px 0 40px 0;
  font-size: 40px;
  font-weight: bold;
}
.about p {
  padding-bottom: 40px;
}
.more {
  padding-bottom: 30px;
}
.more h1 {
  padding: 60px 0 40px 0;
  font-size: 30px;
}
.go {
  padding-bottom: 30px;
}
.go h1 {
  padding: 100px 0 40px 0;
  font-size: 30px;
}
</style>
