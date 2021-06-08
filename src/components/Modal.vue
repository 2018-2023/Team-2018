<template>
  <div id="about_container">
    <span class="about_pointer" v-on:click="aboutModal">aaaaa</span>
    <div id="mask" v-show="showModal" v-on:click="closeModal">
      <section id="modal">
        <div class="close" v-on:click="closeModal">x</div>
      </section>
    </div>
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
  margin-right: 5px;
  cursor: pointer;
}
/* #modal.hidden {
  transform: translate(0, -500px);
} */
</style>
