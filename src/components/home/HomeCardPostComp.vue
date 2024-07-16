<template>
  <div
    v-if="loading"
    class="spinner-border text-secondary d-flex m-auto"
    role="status"
  >
    <span class="visually-hidden">Loading...</span>
  </div>

  <div v-else class="row">
    <div class="d-flex w-100 justify-content-center position-relative">
      <h1 class="m-0 px-5">{{ this.posts.title }}</h1>

      <div class="favoritos d-flex position-absolute">
        <button
          title="Agregar a favoritos"
          v-show="activaFavPost(this.posts.esFav)"
          @click="this.favPost(this.posts._id)"
          class="btn p-0 btn-fav"
          :id="this.posts._id + 'fav'"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
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
          v-show="activaDeletePost(this.posts.esFav)"
          @click="this.deleteFavPost(this.posts._id)"
          class="btn p-0 btn-fav"
          :id="this.posts._id + 'delete'"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
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
    </div>

    <p class="text-break text-start">{{ this.posts.body }}</p>

    <div class="d-lg-flex justify-content-between">
      <div class="bd-callout col-12 col-lg-5">
        <p class="m-0">Creado el {{ fechaCreacion(this.posts.createdAt) }}</p>
      </div>
      <div
        v-if="this.posts.updatedAt != this.posts.createdAt"
        class="bd-callout col-12 col-lg-5"
      >
        <p class="m-0">
          Actualizado hace
          {{ calcularFechaActualizacion(this.posts.updatedAt) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { getPostSlug } from "@/helpers/posts";
import {
  postUserFavPost,
  deleteUserFavPost,
  getUserFavPost,
} from "@/helpers/auth";
import moment from "moment";

export default {
  name: "CardPostSlug",

  async mounted() {
    try {
      await this.showUserFavsPosts();
      await this.showPostSlug();

      this.loading = false;
    } catch (error) {
      console.log(error);
    }
  },

  //TODO:ACA PONGO LOS PROPS PARA RECIBIR EL PROP DEL VIEW Y LO USA PARA showPostSlug()
  props: { slug: { type: String, required: true } },

  data() {
    return {
      posts: {},
      loading: true,
      misPostsFav: [],
    };
  },

  methods: {
    async showUserFavsPosts() {
      try {
        const response = await getUserFavPost();
        //console.log(response);
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

    activaFavPost(btnFav) {
      //this.misPostsFav && !btnFav el !btnFav me da true xq el post no es favorito entonces yo quiero mostrar la estrella vacia y que tiene la funcion favPost que es para poner como favorito ese post
      //devuelvo true o false para el v-if del template si devuelvo true entra en ese v-if del template y si es false entra en v-else
      //la condicion que tengo en el if es la que tenia en el v-if donde tenia la funcion del favPost
      //this.misPostsFav esto me servia cuando no tenia el guards para autenticar xq si estaba vacio no estaba logueado entonces no entraba

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

    async showPostSlug() {
      try {
        const urlSlug = this.slug;
        const response = await getPostSlug(urlSlug);
        const data = await response.json();
        this.posts = data;
        console.log(this.posts);
        console.log(this.misPostsFav.length);

        //TODO:PARA CARGAR LOS POSTS CON LAS ESTRELLAS PARA LOS QUE SON FAVS
        for (let i = 0; i < this.misPostsFav.length; i++) {
          console.log("for");
          if (this.posts._id == this.misPostsFav[i]._id) {
            console.log(this.posts);
            this.posts.esFav = true;
          }
        }
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

      console.log(fechaActual);
      console.log(fechaActual.diff(fechaCreated, "seconds"));
      console.log(moment(fechaActual).from(fechaCreated, true));

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
.bd-callout {
  padding: 1.25rem;
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
  color: var(--bd-callout-color, inherit);
  background-color: var(--bd-callout-bg, var(--bs-gray-100));
  border-left: 0.25rem solid var(--bd-callout-border, var(--bs-gray-300));
}

.spinner-border {
  width: 4rem;
  height: 4rem;
}

/* calc porque el absolute me toma la parte de arriba y derecha como inicio */
.favoritos {
  width: none;
  right: calc(0% + (27.55px / 2));
  top: calc(50% - (26.6px / 2));
}

.btn-fav:focus {
  border: none;
}
.btn-fav:hover {
  opacity: 70%;
}
</style>
