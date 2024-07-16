<template>
  <div class="row">
    <h3 class="d-flex justify-content-start my-3">
      ¡Hola <span class="badge bg-secondary ms-2"> {{ this.user }} </span>!
    </h3>

    <div class="d-flex justify-content-between flex-column flex-lg-row">
      <div class="col-lg-2 aa">
        <ul
          class="list-group rounded-0 position-sticky flex-row flex-lg-column my-2 my-lg-0"
          ref="lista"
        >
          <li id="1" class="list-group-item p-0 w-100 border border-0">
            <router-link
              :to="{ name: 'datos' }"
              class="nav-link d-flex justify-content-center align-items-center w-100 h-100 p-3"
              >Datos
            </router-link>
          </li>
          <li id="2" class="list-group-item p-0 w-100 border border-0">
            <router-link
              :to="{ name: 'misPosts' }"
              class="nav-link d-flex justify-content-center align-items-center w-100 h-100 p-3"
              >Lista de mis posts
            </router-link>
          </li>
          <li id="3" class="list-group-item p-0 w-100 border border-0">
            <router-link
              :to="{ name: 'favoritos' }"
              class="nav-link d-flex justify-content-center align-items-center w-100 h-100 p-3"
              >Favoritos
            </router-link>
          </li>
          <li
            @click="this.cerrarSesion()"
            id="4"
            class="list-group-item p-3 w-100 border border-0 d-flex align-items-center justify-content-center"
          >
            Cerrar sesion
          </li>
        </ul>
      </div>

      <div class="col-lg-10 ps-0 ps-lg-3">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { logout } from "@/helpers/auth";
export default {
  name: "UserComp",

  data() {
    return {};
  },

  props: {
    user: { type: String, required: true },
    liActivo: { type: String, required: true },
  },

  mounted() {
    this.activa();
  },

  //sino pongo el updated solo se pinta cuando hago f5, gracias al updated se pinta el li solo sin necesidad de pintar
  updated() {
    console.log("updated");
    this.activa();
  },

  methods: {
    async cerrarSesion() {
      localStorage.clear();
      console.log("CLEAR");

      //localStorage.removeItem(name);
      const response = await logout();
      console.log("LOG");
      console.log(response);
      console.log("RES");

      this.$emit("tengo_resultados_logout_userComp", "logout");

      this.$router.push({ name: "home" });
    },

    //me fijo de acuerdo a la url donde estoy pinto el li
    activa() {
      const li = document.getElementsByClassName("list-group-item");
      const url = this.liActivo;
      console.log(url);

      if (url.includes("datos")) {
        li[0].classList.add("activa");
        li[1].classList.remove("activa");
        li[2].classList.remove("activa");

        return;
      }
      if (url.includes("posts")) {
        li[1].classList.add("activa");
        li[0].classList.remove("activa");
        li[2].classList.remove("activa");

        return;
      }

      if (url.includes("favoritos")) {
        li[2].classList.add("activa");
        li[0].classList.remove("activa");
        li[1].classList.remove("activa");

        return;
      } else {
        li[0].classList.remove("activa");
        li[1].classList.remove("activa");
        li[2].classList.remove("activa");
      }
    },
  },
};
</script>

<style scoped>
.list-group-item:hover {
  background-color: RGBA(248, 249, 250);
}

.activa {
  font-weight: bold;
}

.list-group {
  top: 25px;
}

li {
  cursor: pointer;
}
</style>
