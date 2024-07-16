<template>
  <div
    v-if="loading"
    class="spinner-border text-secondary d-flex m-auto"
    role="status"
  >
    <span class="visually-hidden">Loading...</span>
  </div>

  <div v-else class="row">
    <h1>{{ this.posts.title }}</h1>

    <p class="text-break text-start">
      {{ this.posts.body }}
    </p>

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

    <div class="d-flex justify-content-end align-items-baseline">
      <button
        type="button"
        class="btn btn-light me-3 popover"
        data-bs-container="body"
        data-bs-toggle="popover"
        data-bs-placement="left"
      >
        Id
      </button>

      <button class="btn btn-outline-dark mb-3 me-3 p-0">
        <!--TODO: al parecer cuando en la url ya tengo el params no necesito pasarlo de
      vuelta -->
        <router-link
          :to="{ name: 'edit', params: { slug: this.posts.slug } }"
          class="nav-link link-editar"
          >Editar</router-link
        >
      </button>

      <ModalComp
        btnModal="Eliminar"
        :postId="this.posts._id"
        :onClick="deletePostComp"
        :onClickModal="cerrarPopover"
      />
    </div>
  </div>
</template>

<script>
import { getPostSlug, deletePost } from "@/helpers/posts";
import {
  postUserFavPost,
  deleteUserFavPost,
  getUserDatos,
} from "@/helpers/auth";
import moment from "moment";
//para que funcione popover
import { Popover } from "../../assets/bootstrap.bundle.min";

//modal
import ModalComp from "@/components/ModalComp.vue";

export default {
  name: "CardPostSlug",
  components: {
    Popover,
    ModalComp,
  },

  data() {
    return {
      posts: {
        title: "",
        body: "",
        _id: "",
      },
      loading: true,
    };
  },

  //TODO:para tener el id antes del popover y utlizarlo en este, hice al async/await, es decir espero a que se cargue los datos del post y dsps sigo con el post xq sino se incializaba antes el popover que el post tenga los datos

  async mounted() {
    try {
      await this.showPostSlug();
      this.loading = false;
      //TODO:2-SOL: LO TENGO QUE PONER DSPS DEL LOADING SINO NO ME ANDA, ES COMO QUE TOMA QUE TODAVIA ESTA CARGANDO Y EL DOM NO ES EL QUE NECESITO
      this.popoverBoostrap();
    } catch (error) {
      console.log(error);
    }
  },

  //TODO:1-SOL:antes no me seleccionaba el button en el mounted
  // updated() {
  //   this.popoverBoostrap();
  //   console.log("2");
  // },

  //para eliminar el popover cuando cambio de url
  unmounted() {
    const pop = document.getElementsByClassName("bs-popover-auto");
    if (pop.length > 0) {
      console.log(pop);
      pop[0].remove();
    }
    //para eliminar el gris del back del modal que no se va
    const modal = document.getElementsByClassName("modal-backdrop");

    console.log(modal);
    if (modal.length > 0) {
      modal[0].remove();
    }
  },

  props: {
    slug: { type: String, required: true },
  },

  //TODO:2-SOL: SIN EL ASYNC NO ME ANDA, NO ME SELECCIONA EL BTN. NO ENTIENDO PORQUE NO ANDA SIN EL AWAIT PORQUE EL WINDOW.BOOSTRAP SE CARGA ANTES QUE SELECCIONAR EL BTN, ENTONCES NO NECESITO PONER EL AWAIT PARA TENER ANTES EL WINDOW. SIN EL ASYNC FUNCIONARIA SI NO TUVIERA EL LOADING. EL LOADING HACE QUE TENGA QUE ESPERAR A QUE SE CARGUE EL DOM Y NO EL SPINNER DE CARGA
  methods: {
    cerrarPopover() {
      const pop = document.querySelector(".modal-backdrop");
      console.log(pop);
      pop.classList.add("modal-back-zindex");
      console.log(pop);
    },

    async favPost() {
      const id = this.posts._id;
      console.log(id);
      const response = await postUserFavPost(id);
      console.log(response);
      const data = await response.json();
      console.log(data);
    },

    async deleteFavPost() {
      const id = this.posts._id;
      console.log(id);
      const response = await deleteUserFavPost(id);
      console.log(response);
      const data = await response.json();
      console.log(data);
    },

    async popoverBoostrap() {
      //para que funcione popover, esto es por el new bootstrap.

      window.bootstrap = await require("../../assets/bootstrap.bundle.min");

      const popoverTriggerList = document.querySelectorAll(
        '[data-bs-toggle="popover"]'
      );

      //content: this.posts._id, para poder agregar contenido dinamico, tiene options y metodos el Popover
      const popoverList = [...popoverTriggerList].map(
        (popoverTriggerEl) =>
          new bootstrap.Popover(popoverTriggerEl, {
            content: this.posts._id,
          })
      );
      return popoverList;
    },

    async showPostSlug() {
      try {
        const urlSlug = this.slug;
        const response = await getPostSlug(urlSlug);
        const data = await response.json();
        this.posts = data;
      } catch (error) {
        console.log(error);
      }
    },

    async deletePostComp(urlId) {
      try {
        await deletePost(urlId);

        this.$router.push({ name: "home" });
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

/*  */
.popover {
  z-index: 1;
}

.popover-body {
  z-index: 1;
}

.popover-auto-zindex {
  z-index: 1040;
  background-color: brown;
}

.modal-back-zindex {
  z-index: 1080;
  background-color: brown;
}

.link-editar {
  padding: 0.375rem 0.75rem;
}
</style>
