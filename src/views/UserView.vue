<template>
  <div class="home container-lg">
    <UserComp
      :user="this.user"
      :liActivo="this.$route.path"
      @tengo_resultados_logout_userComp="onResultados"
    />
  </div>
</template>

<script>
import UserComp from "@/components/user/UserComp.vue";

export default {
  name: "UserView",
  components: {
    UserComp,
  },

  //TODO: LOS PONGO PARA AGARRAR EL PARAMS DE LA RUTA
  props: { user: { type: String, required: true } },

  unmounted() {
    this.$emit("tengo_resultados_logoutt", "logout");
  },

  methods: {
    onResultados(datos) {
      console.log(datos);
    },
  },
};
</script>
