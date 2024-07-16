<template>
  <NavComp
    :cambioNavLogin="this.cambioLogin"
    :cambioNavLogout="this.cambioLogout"
  />

  <router-view v-slot="{ Component }">
    <transition
      name="custom-classes"
      enter-active-class="animate__animated animate__fadeIn"
    >
      <!-- tengo_resultadoss aprece en todos los comps view pero sirve solo con el login view porque es el que emtite este evento(tengo_resultadoss) -->
      <component
        :is="Component"
        @tengo_resultados_login="onResultados"
        @tengo_resultados_logoutt="onResultadoss"
      />
    </transition>
  </router-view>

  <FooterComp />
</template>

<script>
import NavComp from "@/components/NavComp.vue";
import FooterComp from "@/components/FooterComp.vue";

export default {
  name: "App",

  components: {
    NavComp,
    FooterComp,
  },

  data() {
    return { cambioLogin: "", cambioLogout: "" };
  },

  methods: {
    onResultados(datos) {
      this.cambioLogin = datos;
      // console.log(datos + " onResultados");
      console.log(datos);
    },

    onResultadoss(datos) {
      this.cambioLogout = datos;
      console.log(datos);
    },
  },

  created() {
    console.log("created APP");
  },

  beforeRouteUpdate() {
    console.log("beforeRouteUpdate APP");
  },

  //TODO: UNA VEZ QUE PUSE EL NICKNAME EN EL NAV VACIO LAS VARIABLES cambioLogin: "", cambioLogout: "", PORQUE POR EJ, SI YA INICIE SESION UNA VEZ A LA SEGUNDA, SI NO VACIO, NO ME VUELVE A PONER EL NICK PORQUE cambioLogin YA TIENE VALOR (DE LA PRIMERA VEZ QUE INCIE), ENTONCES UNA VEZ QUE YA INICIE SESION SE VACIE  cambioLogin, LO MISMO PARA EL LOGOUT
  //SE EJECUTA DOS VECES EL UPDATE POR  this.cambioLogin O this.cambioLogout = ""
  updated() {
    // console.log("vacio login");

    this.cambioLogin = "";
    this.cambioLogout = "";

    console.log("updated APP");
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
