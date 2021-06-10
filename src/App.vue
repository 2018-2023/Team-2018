<template>
  <div>
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"

export default {
  components: {
    Header,
    Footer,
  },
}
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
}
</style>
