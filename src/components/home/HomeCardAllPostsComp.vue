<template>
  <div
    v-if="loading"
    class="spinner-border text-secondary d-flex m-auto"
    role="status"
  >
    <span class="visually-hidden">Loading...</span>
  </div>

  <div v-else class="row justify-content-center">
    <TransitionGroup
      name="custom-classes"
      enter-active-class="animate__animated animate__fadeInUp"
      leave-active-class="animate__animated animate__fadeOutDown"
    >
      <div
        v-for="p in posts"
        :key="p"
        class="card text-bg-dark p-0 mx-3 my-3 col-12 col-lg-5"
      >
        <div class="card-header card-title">
          <p class="title m-0">{{ p.title }}</p>
        </div>

        <div class="card-body py-1">
          <p class="card-text text-start mb-2">{{ p.body }}</p>

          <small class="text-muted align-items-end d-block"
            >Creado por: {{ p.user }}</small
          >

          <div>
            <small class="text-muted align-items-end d-block"
              >Creado el
              {{ fechaCreacion(p.createdAt) }}
            </small>

            <small
              v-if="p.updatedAt != p.createdAt"
              class="text-muted align-items-end d-block"
              >Actualizado hace
              {{ calcularFechaActualizacion(p.updatedAt) }}</small
            >
          </div>

          <button
            title="Agregar a favoritos"
            v-show="activaFavPost(p.esFav)"
            @click="this.favPost(p._id)"
            class="btn p-0 btn-fav"
            :id="p._id + 'fav'"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-star text-success"
              viewBox="0 0 16 16"
            >
              <path
                d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"
              />
            </svg>
          </button>

          <button
            title="Quitar de favoritos"
            v-show="activaDeletePost(p.esFav)"
            @click="this.deleteFavPost(p._id)"
            class="btn p-0 btn-fav"
            :id="p._id + 'delete'"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-star-fill text-success"
              viewBox="0 0 16 16"
            >
              <path
                d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
              />
            </svg>
          </button>
        </div>

        <div class="card-footer p-0">
          <button class="btn btn-dark h-100 w-100 btn-ver-mas p-0">
            <router-link
              :to="{ name: 'homePost', params: { slug: p.slug } }"
              class="nav-link link-ver-mas"
              >Ver mas</router-link
            >
          </button>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script>
import { getPosts } from "@/helpers/posts";
import {
  postUserFavPost,
  deleteUserFavPost,
  getUserFavPost,
} from "@/helpers/auth";

import moment from "moment";
import { mapActions } from "vuex";

export default {
  name: "CardAllPosts",
  components: {},

  async mounted() {
    try {
      await this.showUserFavsPosts();

      this.getPosts();
      await this.showPostsComp();

      console.log(this.misPostsFav);

      this.loading = false;
    } catch (error) {
      console.log(error);
    }
  },

  data() {
    return {
      posts: [],
      fecha: "",
      loading: true,
      misPostsFav: [],
    };
  },

  methods: {
    //vuex
    ...mapActions(["getPosts"]),
    //
    activaFavPost(btnFav) {
      //this.misPostsFav && !btnFav el !btnFav me da true xq el post no es favorito entonces yo quiero mostrar la estrella vacia y que tiene la funcion favPost que es para poner como favorito ese post
      //devuelvo true o false para el v-if del template si devuelvo true entra en ese v-if del template y si es false entra en v-else
      //la condicion que tengo en el if es la que tenia en el v-if donde tenia la funcion del favPost

      if (this.misPostsFav && !btnFav) {
        console.log("if fav");
        return true;
      } else {
        return false;
      }
    },

    activaDeletePost(btnFav) {
      if (this.misPostsFav && btnFav) {
        console.log("if delete");
        return true;
      } else {
        return false;
      }
    },

    async showUserFavsPosts() {
      try {
        const response = await getUserFavPost();
        const data = await response.json();
        console.log(data);

        // SI TENGO UN 401 ES XQ NO ESTA LOGUEADO Y NO MUESTRO LA ESTRELLA Y NO PUEDO PONER FAVORITOS
        if (response.status == 401) {
          this.misPostsFav = "";
          return;
        }

        this.misPostsFav = data;
      } catch (error) {
        console.log(error);
      }
    },

    async favPost(idPost) {
      const id = idPost;
      console.log(id);
      const response = await postUserFavPost(id);
      console.log(response);
      const data = await response.json();
      console.log(data);

      const btnFav = document.getElementById(idPost + "fav");
      console.log(btnFav);
      btnFav.classList.add("d-none");

      const btnDelete = document.getElementById(idPost + "delete");
      console.log(btnDelete);
      btnDelete.classList.add("d-inline-block");

      btnDelete.classList.remove("d-none");
    },

    async deleteFavPost(idPost) {
      const id = idPost;
      console.log(id);
      const response = await deleteUserFavPost(id);
      console.log(response);
      const data = await response.json();
      console.log(data);

      const btnFav = document.getElementById(idPost + "fav");
      console.log(btnFav);
      btnFav.classList.add("d-inline-block");

      btnFav.classList.remove("d-none");

      const btnDelete = document.getElementById(idPost + "delete");
      console.log(btnDelete);
      btnDelete.classList.add("d-none");
    },

    async showPostsComp() {
      try {
        console.log("home");
        const response = await getPosts();

        const data = await response.json();

        this.posts = data;

        //TODO:PARA CARGAR LOS POSTS CON LAS ESTRELLAS PARA LOS QUE SON FAVS
        for (let i = 0; i < this.posts.length; i++) {
          for (let j = 0; j < this.misPostsFav.length; j++) {
            if (this.posts[i]._id == this.misPostsFav[j]._id) {
              console.log(this.posts[i]);
              this.posts[i].esFav = true;
            }
          }
        }

        console.log(this.posts);
      } catch (error) {
        console.log(error);
      }
    },

    fechaCreacion(created) {
      return moment(created).format("DD/MM/YY, h:mm:ss a");
    },

    // TODO:fijarme si create es igual a update pongo fecha de creacion sino hace cuanto se actualizo
    calcularFechaActualizacion(created) {
      const fechaActual = moment();
      const fechaCreated = moment(created);
      const tiempoSegundosDiferencia = fechaActual.diff(
        fechaCreated,
        "seconds"
      );

      if (tiempoSegundosDiferencia < 60) {
        const cantidad = tiempoSegundosDiferencia;
        const resultado = cantidad > 1 ? " segundos" : " segundo";
        return cantidad + resultado;
        // return tiempoSegundosDiferencia + " segundos";
      } else if (
        tiempoSegundosDiferencia > 60 &&
        3600 > tiempoSegundosDiferencia
      ) {
        const cantidad = Math.round(tiempoSegundosDiferencia / 60);
        const resultado = cantidad > 1 ? " minutos" : " minuto";
        return cantidad + resultado;
        // return Math.round(tiempoSegundosDiferencia / 60) + " minutos";
      } else if (
        tiempoSegundosDiferencia > 3600 &&
        tiempoSegundosDiferencia < 86400
      ) {
        const cantidad = Math.round(tiempoSegundosDiferencia / 3600);
        const resultado = cantidad > 1 ? " horas" : " hora";
        return cantidad + resultado;
        //return Math.round(tiempoSegundosDiferencia / 3600) + " horas";
      } else {
        const cantidad = Math.round(tiempoSegundosDiferencia / 86400);
        const resultado = cantidad > 1 ? " dias" : " dia";
        return cantidad + resultado;
      }
      // return moment(fechaActual).from(fechaCreated, true);
    },
  },
};
</script>

<style scoped>
.card {
  height: 18rem;
}

.card-text {
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.btn-ver-mas {
  border-radius: 0px 0px 5px 5px;
}

.title {
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.spinner-border {
  width: 4rem;
  height: 4rem;
}

.btn-fav:focus {
  border: none;
}
.btn-fav:hover {
  opacity: 70%;
}

.link-ver-mas {
  padding: 0.375rem 0.75rem;
}
</style>
