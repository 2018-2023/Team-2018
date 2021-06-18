<template>
  <div class="home-map">
    <full-map />
  </div>
</template>

<script>
import FullMap from "@/components/Home/FullMap.vue"
export default {
  components: {
    FullMap,
  },
}
</script>

<style>
.home-map {
  height: 100vh;
  width: 100vw;
}
</style>
