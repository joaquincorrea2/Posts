<template>
  <div class="new container-sm">
    <h2>NEW</h2>
    <CardNewPost />
  </div>
</template>

<script>
import CardNewPost from "@/components/manage/ManageCardNewPostComp.vue";

export default {
  name: "NewView",
  components: {
    CardNewPost,
  },
};
</script>
