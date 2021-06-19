<template>
  <l-circle-marker
    :lat-lng="center"
    :radius="circle.radius"
    :color="circle.color"
  />
</template>

<script>
import { LCircleMarker } from "vue2-leaflet"

export default {
  props: {
    center: {
      type: Array,
      require: true,
    },
  },
  components: {
    LCircleMarker,
  },
  data() {
    return {
      circle: {
        radius: 10,
        color: "red",
      },
    }
  },
}
</script>
