<template>
  <div class="form_background">
    <section id="form_container">
      <div class="head_box">
        <h1 class="form_title">{{ title }}</h1>
        <div class="img_box">
          <img
            src="@/assets/google.png"
            @click="gFunc"
            class="google_icon"
            alt="google_icon"
          />
        </div>
        <fa-icon icon="mouse-pointer" class="mouse_pointer"></fa-icon>
      </div>
      <div class="input_box">
        <fa-icon :icon="['far', 'envelope']"></fa-icon>
        <input type="text" v-model="email" class="form_text" />
      </div>
      <div class="input_box">
        <fa-icon icon="lock" class="two"></fa-icon>
        <input type="text" v-model="password" class="form_text two" />
      </div>
      <fa-icon
        icon="plus-square"
        @click="func(email, password)"
        class="submit_icon"
      ></fa-icon>
      <div class="toSignUp_box">
        <span
          >{{ toSignUp1
          }}<router-link to="/signup" class="link" id="SignUp">{{
            toSignUp2
          }}</router-link
          >{{ toSignUp3 }}</span
        >
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    }
  },
  props: {
    title: { type: String, required: true },
    func: { type: Function, required: true },
    gFunc: { type: Function, required: true },
    toSignUp1: { type: String, required: true },
    toSignUp2: { type: String, required: true },
    toSignUp3: { type: String, required: true },
  },
}
</script>

<style scoped>
.form_background {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);
  padding-top: 200px;
}
#form_container {
  background: #fff;
  color: #555;
  width: 400px;
  height: 250px;
  border-radius: 4px;
  margin: 0 auto;
}
.head_box {
  height: 75px;
  position: relative;
}
.form_title {
  margin-left: 10px;
  text-align: left;
  font-family: cursive;
  line-height: 75px;
  font-size: 1.5rem;
}
.google_icon {
  position: absolute;
  top: 5px;
  left: 5px;
  width: 30px;
  line-height: 40px;
  cursor: pointer;
}
.mouse_pointer {
  font-size: 10px;
  color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 50px;
  right: 15px;
}
.input_box {
  display: flex;
  width: 70%;
  margin: 0 auto;
}
.form_text {
  display: block;
  margin-top: 3rem;
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
.form_box {
  width: 16rem;
  background-color: blue;
  margin: 0 auto;
  margin-top: 1.5rem;
}
.submit_icon {
  cursor: pointer;
  font-size: 25px;
  margin-top: 1rem;
}
.submit_icon:hover {
  color: blue;
}
.toSignUp_box {
  margin-top: 2.5rem;
  font-size: 0.8rem;
}
.img_box {
  height: 40px;
  position: absolute;
  top: 20px;
  right: 15px;
  width: 40px;
  cursor: pointer;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
}

@media screen and (max-width: 450px) {
  #form_container {
    width: 95%;
  }
  .form_text {
    width: 13rem;
  }
}
</style>
