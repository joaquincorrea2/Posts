<template>
  <div class="edit container-sm">
    <h2>EDIT</h2>
    <CardEditarPost :slug="this.slug" />
  </div>
</template>

<script>
import CardEditarPost from "@/components/manage/ManageCardEditarPostComp.vue";

export default {
  name: "EditView",
  components: { CardEditarPost },
  props: { slug: { type: String, required: true } },
};
</script>
