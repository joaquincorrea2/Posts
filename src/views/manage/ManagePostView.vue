<template>
  <div class="home container-sm">
    <h2>POST</h2>
    <CardPostComp :slug="this.slug" />
  </div>
</template>

<script>
import CardPostComp from "@/components/manage/ManageCardPostComp.vue";

export default {
  name: "PostView",
  components: {
    CardPostComp,
  },
  props: { slug: { type: String, required: true } },
};
</script>
