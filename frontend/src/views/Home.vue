<template>
  <div class="home">
    <div class="container">
      <PostWall />
    </div>
  </div>
</template>

<script>
import PostWall from "@/components/PostWall.vue";

export default {
  name: "Home",
  components: {
    PostWall,
  },
}
</script>
