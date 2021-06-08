<template>
  <div id="about_container">
    <span class="about_pointer" v-on:click="aboutModal">モーダル</span>
    <div id="mask" v-show="showModal" v-on:click="closeModal"></div>
    <section id="modal" v-show="showModal">
      <div class="close">
        <fa-icon
          icon="times"
          class="close_btn"
          v-on:click="closeModal"
        ></fa-icon>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return { showModal: false }
  },
  methods: {
    aboutModal() {
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    },
  },
}
</script>

<style scoped>
.about_pointer {
  font-weight: bold;
  cursor: pointer;
  text-decoration: underline;
}

#mask {
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1;
}
/* #mask.hidden {
  display: none;
} */
#modal {
  background: #fff;
  color: #555;
  width: 50%;
  height: 50%;
  /* padding: 40px; */
  border-radius: 4px;
  position: absolute;
  top: 25%;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 2;
}
.close {
  text-align: right;
  margin: 10px 10px 0 0;
}
.close_btn {
  cursor: pointer;
}
</style>
