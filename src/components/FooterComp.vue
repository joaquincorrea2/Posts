<template>
  <div class="container-sm">
    <footer class="py-3 my-4">
      <ul class="nav justify-content-center border-bottom pb-3 mb-3">
        <li class="nav-item">
          <router-link
            :to="{ name: 'home' }"
            aria-current="page"
            class="nav-link px-2 text-muted"
            >Home</router-link
          >
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'new' }" class="nav-link px-2 text-muted"
            >Nuevo</router-link
          >
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'posts' }" class="nav-link px-2 text-muted"
            >Mis posts
          </router-link>
        </li>
      </ul>
      <p class="text-center text-muted">&copy; {{ this.año }} Posts, Inc</p>
    </footer>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "FooterComp",

  data() {
    return {
      año: "",
    };
  },

  created() {
    this.obtenerAño();
  },

  methods: {
    obtenerAño() {
      this.año = moment().format("YYYY");
    },
  },
};
</script>

<style scoped>
.bi {
  color: white;
}
</style>
