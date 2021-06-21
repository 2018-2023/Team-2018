<template>
  <section id="login_container">
    <!-- <div class="head_box"> -->
    <h1 class="login_title">Login</h1>
    <!-- </div> -->
    <div class="input_box">
      <fa-icon :icon="['far', 'envelope']"></fa-icon>
      <input type="text" v-model="login_email" class="login_text" />
    </div>
    <div class="input_box">
      <fa-icon icon="lock" class="two"></fa-icon>
      <input type="text" v-model="login_password" class="login_text two" />
    </div>
    <div class="login_box">
      <button class="login_btn">Login</button>
      <button class="g_login_btn">
        aa
        <img src="@/assets/google.png" class="google_icon" alt="google_icon" />
      </button>
    </div>
  </section>
</template>

<style scoped>
#login_container {
  /* background-color: blue; */
  /* background: #fff; */
  color: #555;
  width: 400px;
  height: 35%;
  /* padding: 40px; */
  border-radius: 4px;
  /* position: absolute;
  top: 25%;
  left: 0;
  right: 0; */
  margin: 0 auto;
}
.input_box {
  display: flex;
  width: 70%;
  margin: 0 auto;
}
.login_text {
  display: block;
  margin: 0 auto;
  width: 15rem;
  border-bottom: 1px solid red;
  border-right: none;
  border-left: none;
  border-top: none;
  outline: none;
}
.two {
  margin-top: 2rem;
}
.login_box {
  width: 16rem;
  background-color: blue;
  margin: 0 auto;
  margin-top: 1.5rem;
}
.login_btn {
  width: 7.5rem;
  height: 3rem;
  margin-left: 0.5rem;
}
.g_login_btn {
  width: 7.5rem;
  height: 3rem;
  /* margin-left: 1rem; */
  position: relative;
}
.google_icon {
  width: 20%;
  /* height: 20%; */
  position: absolute;
  top: 40%;
  left: 40%;
}
/* .login_btn {
  width: 7.5rem;
  font-size: 2.2rem; */
/* height: 3rem; */
/* height: 40px; */
/* } */
/* .login_btn:last-child {
  margin-left: 1rem;
} */
/* .google_icon {
  width: 2.2rem;
  line-height: 2.2rem;
} */
</style>
