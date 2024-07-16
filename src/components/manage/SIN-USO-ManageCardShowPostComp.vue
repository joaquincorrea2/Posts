<template>
  <div class="row justify-content-center">
    <TransitionGroup
      name="custom-classes"
      enter-active-class="animate__animated animate__fadeInUp"
      leave-active-class="animate__animated animate__fadeOutDown"
    >
      <!-- para poder eliminar la transicion cuando elimino, puse una variable delete que se aumenta cada vez que elimino, entonces con el v-if si la variable es mayor que 0 significa que borre entonces no ejecuta la transicion de leave, si cuando elimino se aplica individualmente la transicion para esa card que elimino, no entiendo como esta funcionando el v-if, otra cosa que vi que si no se elimina alguno que no el ultimo post simula elminar el ultimo pero en realidad esta eliminando el que seleccione pero hace la transicion con el ultimo-->
      <div
        v-for="p in posts"
        :key="p"
        class="card text-bg-dark p-0 mx-3 my-3 col-12 col-sm-5"
        v-if="this.delete >= 0"
      >
        <div class="card-header card-title">{{ p.title }}</div>
        <router-link
          :to="{ name: 'post', params: { slug: p.slug } }"
          class="nav-link"
          >{{ p.slug }}</router-link
        >
        <!-- <div class="card-body">
          <h5 class="card-title">{{ p.title }}</h5>
          <p class="card-text">{{ p.body }}</p>
          TODO:NAMED ROUTES CON PARAMS,paso el :id que necesita la ruta con el params, antes tenia esto "'/posts/edit/' + p._id"
          <router-link
            :to="{ name: 'edit', params: { slug: p.slug } }"
            class="nav-link"
            >Editar</router-link
          >
          <button @click="deletePostComp(p._id)" class="btn btn-dark mb-3">
            Eliminar
          </button>
        </div> -->

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
          <button class="btn btn-dark h-100 w-100">
            <router-link
              :to="{ name: 'post', params: { slug: p.slug } }"
              class="nav-link"
              >Ver mas</router-link
            >
          </button>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script>
import { getPosts, deletePost } from "@/helpers/posts";
import moment from "moment";

export default {
  name: "CardPost",

  //FORMA 1 = THEN/CATCH
  //si usaria el then y catch en el fetch no necesito el async y await
  /* mounted() {
    this.posts =  getPosts();
    //console.log(this.posts);
  },*/

  //FORMA 1 = ASYNC/AWAIT
  //recibo el fetch como promise y lo trabajo con async y await
  mounted() {
    try {
      this.showPostsComp();
      console.log("mounted " + this.delete);
      console.log(this.delete >= 0);
    } catch (error) {
      console.log(error);
    }
  },

  data() {
    return { posts: [], delete: 0 };
  },

  methods: {
    //antes como el delete de la api no respondia (.send) nada no me seguia el flujo y no me ejecutaba el showPostComp()
    async deletePostComp(urlId) {
      try {
        //console.log(this.posts);
        const postBorrado = await deletePost(urlId);
        //aca imprimo el response
        console.log(postBorrado);
        const postBorradoJson = await postBorrado.json();
        //aca imprimo json del objeto borrado
        console.log(postBorradoJson);

        //console.log(this.posts);
        console.log("delete antes antes " + this.delete);
        this.showPostsComp();
        console.log("delete antes " + this.delete);
        this.delete++;
        console.log("delete dsps " + this.delete);
        console.log(this.delete >= 0);
      } catch (error) {
        console.log(error);
      }
    },

    async showPostsComp() {
      try {
        console.log("show " + this.delete);
        const response = await getPosts();
        const data = await response.json();
        this.posts = data;
      } catch (error) {
        console.log(error);
      }
    },

    fechaCreacion(created) {
      return moment(created).format("D/MM/YY, h:mm:ss a");
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
  /* width: 18rem; */
}

.card-text {
  /* overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; */

  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.btn {
  border-radius: 0px 0px 5px 5px;
}
</style>
