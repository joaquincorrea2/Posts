<template>
  <div class="home container-sm">
    <h2>POST HOME</h2>
    <HomeCardPostComp :slug="this.slug" />
  </div>
</template>

<script>
import HomeCardPostComp from "@/components/home/HomeCardPostComp.vue";

export default {
  name: "HomePostView",

  components: {
    HomeCardPostComp,
  },

  //TODO:ACA PONGO LOS PROPS PARA RECIBIR EL PROP SLUG DE LA RUTA Y SE LO PASO AL COMP
  props: { slug: { type: String, required: true } },
};
</script>
