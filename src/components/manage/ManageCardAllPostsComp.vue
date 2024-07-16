<template>
  <div
    v-if="loading"
    class="spinner-border text-secondary d-flex m-auto"
    role="status"
  >
    <span class="visually-hidden">Loading...</span>
  </div>

  <div v-else>
    <h3 v-if="this.posts.length == 0">
      Todavia no se crearon posts.
      <router-link :to="{ name: 'new' }" class="nav-link anchor d-inline">
        Podes crear desde aca!
      </router-link>
    </h3>

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
          <!-- TODO: PARA OCULTAR CON LOS PUNTOS SUPSPENSIVOS PONER UN P ADNTRO DE UN DIV -->
          <div class="card-header card-title">
            <p class="title m-0">{{ p.title }}</p>
          </div>

          <div class="card-body">
            <p class="card-text text-start">{{ p.body }}</p>

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

          <div class="card-footer p-0">
            <button class="btn btn-dark h-100 w-100 p-0">
              <router-link
                :to="{ name: 'post', params: { slug: p.slug } }"
                class="nav-link link-ver-mas"
                >Ver mas</router-link
              >
            </button>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script>
import { getUserPosts } from "@/helpers/posts";
import moment from "moment";

export default {
  name: "CardAllPosts",

  async mounted() {
    try {
      await this.showPostsComp();
      this.loading = false;
    } catch (error) {
      console.log(error);
    }
  },

  data() {
    return { posts: [], fecha: "", loading: true };
  },

  methods: {
    async showPostsComp() {
      try {
        const response = await getUserPosts();
        const data = await response.json();

        //TODO: SI NO PONGO ESTE IF ME DABA ERROR XQ EL IS AUTH DEVUELVE UN ERORR 401 Y UN JSON CON UN MSG (NO AUTORIZADO), ENTONCES ME GUARDABA ESE MSG EN this.posts Y USABA LOS POSTS PARA TOMAR EL SLUG Y PONERLO EN EL ROUTER LINK DEL VER MAS PARA IR AL POST ESPECIFICO, ENTONCES ME DABA EL ERROR QUE NO ENCONTRABA EL PARAMS (SLUG) YA QUE EXISTIA EL POST (XQ TENIA EL VALOR DEL MSG), EL IF this.posts QUEDA VACIO Y TIENE NINGUN VALOR (QUEDA COMO UN ARRAY VACIO) Y POR ESO NO ME TIRA EL ERROR
        if (response.status != 401) {
          this.posts = data;
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

      if (tiempoSegundosDiferencia < 60) {
        return tiempoSegundosDiferencia + " segundos";
      } else if (
        tiempoSegundosDiferencia > 60 &&
        3600 > tiempoSegundosDiferencia
      ) {
        return Math.round(tiempoSegundosDiferencia / 60) + " minutos";
      } else if (
        tiempoSegundosDiferencia > 3600 &&
        tiempoSegundosDiferencia < 86400
      ) {
        return Math.round(tiempoSegundosDiferencia / 3600) + " horas";
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
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.btn {
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

.anchor:hover {
  text-decoration: underline;
}

.link-ver-mas {
  padding: 0.375rem 0.75rem;
}
</style>
