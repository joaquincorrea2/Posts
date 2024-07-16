<template>
  <div class="container-sm">
    <h2>MIS POSTS</h2>
    <ManageCardAllPostsComp nameRouter="post" />
  </div>
</template>

<script>
import ManageCardAllPostsComp from "@/components/manage/ManageCardAllPostsComp.vue";

export default {
  name: "PostsView",

  components: {
    ManageCardAllPostsComp,
  },
};
</script>
