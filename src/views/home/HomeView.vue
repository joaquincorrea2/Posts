<template>
  <div class="home container-sm">
    <h2>HOME</h2>
    <ButtonBack />
    <CardAllPosts />
  </div>
</template>

<script>
import CardAllPosts from "@/components/home/HomeCardAllPostsComp.vue";
import ButtonBack from "@/components/ButtonBackComp.vue";

export default {
  name: "HomeView",
  components: {
    CardAllPosts,
    ButtonBack,
  },
};
</script>
