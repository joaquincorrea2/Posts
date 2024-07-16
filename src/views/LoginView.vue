<template>
  <div class="login container-sm">
    <LoginComp />
  </div>
</template>

<script>
import LoginComp from "@/components/LoginComp.vue";

export default {
  name: "LoginView",

  components: {
    LoginComp,
  },

  data() {
    return {};
  },

  unmounted() {
    // console.log("unmounted LOGIN");
    this.$emit("tengo_resultados_login", "login");
  },

  methods: {
    onResultados(datos) {
      console.log(datos);
    },
  },
};
</script>
