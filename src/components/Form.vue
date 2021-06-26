<template>
  <div class="form_background">
    <section id="form_container">
      <div class="head_box">
        <h1 class="form_title">{{ title }}</h1>
        <img
          src="@/assets/google.png"
          @click="gFunc"
          class="google_icon"
          alt="google_icon"
        />
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
  padding-top: 100px;
}
#form_container {
  background: #fff;
  color: #555;
  width: 400px;
  /* width: 50%; */
  height: 250px;
  /* padding: 40px; */
  border-radius: 4px;
  /* position: absolute;
  top: 25%;
  left: 0;
  right: 0; */
  /* margin: 100px; */
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
  top: 23px;
  right: 15px;
  width: 30px;
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

@media screen and (max-width: 450px) {
  .form_background {
    padding-top: 200px;
  }
  #form_container {
    width: 95%;
    /* height: 300px; */
  }
}
</style>
