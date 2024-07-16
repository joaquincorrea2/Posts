<template>
  <div
    v-if="loading"
    class="spinner-border text-secondary d-flex m-auto"
    role="status"
  >
    <span class="visually-hidden">Loading...</span>
  </div>

  <table v-else class="table table-striped">
    <thead>
      <tr>
        <th class="col-1" scope="col">#</th>
        <th class="col-3" scope="col">Creado por:</th>
        <th class="col-8" scope="col">Title</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="p in this.posts" :key="p">
        <td>{{ p.index }}</td>
        <td>{{ p.user }}</td>
        <th scope="row" class="_id">
          <router-link
            v-if="this.postEsEditable(p.user, p.slug)"
            :to="{ name: 'post', params: { slug: p.slug } }"
            class="nav-link elipsis"
          >
            {{ p.title }}
          </router-link>

          <router-link
            v-else
            :to="{ name: 'homePost', params: { slug: p.slug } }"
            class="nav-link elipsis"
          >
            {{ p.title }}
          </router-link>
        </th>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { getUserDatos, getUserFavPost } from "@/helpers/auth";

export default {
  data() {
    return {
      posts: [],
      postsOrdenado: [],
      favs: [],
      loading: true,
      misPostsFav: [],
      userNickname: "",
    };
  },

  props: { user: { type: String, required: true } },

  async created() {
    try {
      await this.getFavsPosts();
      await this.showUserFavsPosts();

      this.loading = false;
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    //TODO: EN userNickname TENGO EL USER DE ESA FORMA NO TENGO QUE HACER BUSQUEDA EN DB ACA, ANTES POR TENER ASYNC/AWAIT NO ME FUNCIONABA EL V-IF, SE VE QUE EN LOS V-IF O V-SHOW NO CONVIENE TENER FUNCIONES ASINCRONICAS SINO TENER LOS DATOS DE ANTEMANO Y HACER FUNCIONES DE COMPRBACION DE ESOS DATOS
    postEsEditable(postUser, postSlug) {
      try {
        console.log("postEsEditable");

        console.log(postUser);
        console.log(postSlug);
        console.log(this.userNickname);
        if (postUser == this.userNickname) {
          console.log("nickname");
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async getFavsPosts() {
      try {
        const response = await getUserDatos(this.user);
        const data = await response.json();
        console.log(data);

        this.userNickname = data.nickname;

        // SI TENGO UN 404 ES XQ NO ESTA LOGUEADO Y NO MUESTRO LA ESTRELLA Y NO PUEDO PONER FAVORITOS
        if (response.status == 404) {
          this.misPostsFav = "";
          return;
        }

        this.misPostsFav = data.favs;
      } catch (error) {
        console.log(error);
      }
    },

    async showUserFavsPosts() {
      try {
        //getUserFavPost YA ME TRAE ORDENADO LOS POSTS
        const response = await getUserFavPost();
        const data = await response.json();
        console.log(data);

        this.posts = data;

        // //TODO: ORDENAR POR ORDEN DE ACUERDO CUANDO SE AGREGARON A FAVS LOS POSTS
        // for (let i = 0; i < this.posts.length; i++) {
        //   for (let j = 0; j < this.misPostsFav.length; j++) {
        //     if (this.posts[i]._id == this.misPostsFav[j]) {
        //       console.log(i);
        //       console.log(this.posts[i]._id);
        //       console.log(j);
        //       console.log(this.misPostsFav[j]);

        //       //creo un nuevo array con los posts ordenados de acuerdo cuando se agregaron a favoritos, uso el inidice de cuando se agrego (j) y en es posicion agrego el post (this.posts[i])
        //       this.postsOrdenado[j] = this.posts[i];

        //       //creo inidice de orden de acuerdo cuando se agrego
        //       this.postsOrdenado[j].index = j + 1;
        //     }
        //   }
        // }

        //PONER UN INDICE PARA EL ORDEN DE LA TABLA
        //TODO: SI PONGO EL i++ ME MODIFICA LA VARIABLE I DEL FOR
        //en cambio i + 1 no modifica el i del for sino al index que estoy creando xq yo uso el valor de la i  y un uno para hacer una suma y asignarla al index pero nunca ordeno modificar la variable i como pasa con i++ donde esoy ordenando sumarle a la variable i
        for (let i = 0; i < this.posts.length; i++) {
          console.log(i);
          console.log(this.posts[i]);
          this.posts[i].index = i + 1;
          console.log(i);
        }

        console.log(this.posts);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
._id:hover {
  text-decoration: underline;
}

.anchor:hover {
  text-decoration: underline;
}

.elipsis {
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
