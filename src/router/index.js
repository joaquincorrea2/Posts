import { createRouter, createWebHistory } from "vue-router";
import { getPosts } from "@/helpers/posts";

import { getUserDatos, getUserDatosGuards } from "@/helpers/auth";

import { getPostSlug } from "@/helpers/posts";

const routes = [
  {
    path: "/",
    name: "home",
    props: true,
    //carga perezosa, solo se carga el componente si se visita la url sino no se usa, webpackChunkName esto es para darle el nombre que va a salir en el network de la consola de chrome
    component: () =>
      import(/* webpackChunkName: "HomeView" */ "../views/home/HomeView.vue"),
    //para que no me quede abajo y suba automaticamente para arriba cuando cambio de pagina (EN REALIDAD NO ESTA FUNCIONANDO AHORA, SI LO SACO NO PASA NADA)
    scrollBehavior(to, from, savedPosition) {
      return (
        savedPosition ||
        new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({ left: 0, top: 0 });
          }, 500);
        })
      );
    },
  },

  {
    path: "/registrar",
    name: "registrar",
    props: true,
    //carga perezosa, solo se carga el componente si se visita la url sino no se usa, webpackChunkName esto es para darle el nombre que va a salir en el network de la consola de chrome
    component: () =>
      import(
        /* webpackChunkName: "RegistrarView" */ "../views/RegistrarView.vue"
      ),
    //para que no me quede abajo y suba automaticamente para arriba cuando cambio de pagina (EN REALIDAD NO ESTA FUNCIONANDO AHORA, SI LO SACO NO PAS NADA)
  },

  //TODO:agregue antes del :slug y :user xq sino me daba error al actualizar user, al actualizar me queria mostar homePost. Parece un error de tener params con la ruta /. Si yo pongo primero user y abajo homePost tengo el mismo problema pero al reves.
  //en cierto sentido tiene logica tener que poner algo antes de una ruta params y no tener solo params, porque por ej mostar la direccion (localhost:8080) y dsps solo el slug no me deja claro a que se refiere el slug
  {
    path: "/post/:slug",
    name: "homePost",
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "HomePostView" */ "../views/home/HomePostView.vue"
      ),
  },

  // saque los props porque daba esta advertencia: https://stackoverflow.com/questions/68803137/vue-3-passing-array-warning-extraneous-non-props-attributes-were-passed-to-comp
  //TODO:ADVERTENCIA DE NON PROPS LA SOLUCIONE PONIENDO TODO EL USER DATOS COMP EN UN DIV, https://vuejs.org/guide/components/attrs.html

  {
    path: "/profile/:user",
    name: "profile",
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "UserView" */ "../views/UserView.vue"),

    children: [
      {
        path: "datos",
        name: "datos",
        props: true,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "UserDatosComp" */ "../components/user/UserDatosComp.vue"
          ),
      },

      {
        path: "mis-posts",
        name: "misPosts",
        props: true,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "UserMisPostsComp" */ "../components/user/UserMisPostsComp.vue"
          ),
      },

      {
        path: "favoritos",
        name: "favoritos",
        props: true,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "UserFavoritosComp" */ "../components/user/UserFavoritosComp.vue"
          ),
      },
    ],
  },

  {
    path: "/login",
    name: "login",
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "LoginView" */ "../views/LoginView.vue"),
  },

  {
    path: "/manage",
    name: "manage",

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "ManageView" */ "../views/manage/ManageView.vue"
      ),
    children: [
      {
        path: "posts",
        name: "posts",

        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "PostsView" */ "../views/manage/ManageAllPostsView.vue"
          ),
      },

      // {
      //   path: "all",
      //   name: "allPosts",
      //   // route level code-splitting
      //   // this generates a separate chunk (about.[hash].js) for this route
      //   // which is lazy-loaded when the route is visited.
      //   component: () =>
      //     import(
      //       /* webpackChunkName: "PostsView" */ "../views/AllPostsView.vue"
      //     ),
      // },

      {
        // TODO:CAMBIAR POR post/:slug
        path: ":slug",
        name: "post",
        props: true,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "PostView" */ "../views/manage/ManagePostView.vue"
          ),
        //TODO: GUARDS PARA QUE NO EL USER NO PUEDA ACCEDER A EDITAR UN POST QUE NO ES SUYO
        beforeEnter: async (to, from) => {
          console.log(to.params.slug);
          console.log(from);
          const response = await getUserDatosGuards();
          console.log(response);
          const data = await response.json();
          console.log(data);

          const responseSlug = await getPostSlug(to.params.slug);
          console.log(responseSlug);
          const dataSlug = await responseSlug.json();
          console.log(dataSlug);

          if (dataSlug.user != data.nickname) {
            return { name: "homePost", params: { slug: to.params.slug } };
          }
        },
      },

      {
        path: "new",
        name: "new",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "NewView" */ "../views/manage/ManageNewView.vue"
          ),
      },

      {
        path: "edit/:slug",
        name: "edit",
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "EditView" */ "../views/manage/ManageEditView.vue"
          ),
        beforeEnter: async (to, from) => {
          console.log(to.params.slug);
          console.log(from);
          const response = await getUserDatosGuards();
          console.log(response);
          const data = await response.json();
          console.log(data);

          const responseSlug = await getPostSlug(to.params.slug);
          console.log(responseSlug);
          const dataSlug = await responseSlug.json();
          console.log(dataSlug);

          if (dataSlug.user != data.nickname) {
            return { name: "homePost", params: { slug: to.params.slug } };
          }
        },
      },
    ],
  },

  {
    path: "/:pathMatch(.*)*",
    name: "error",
    component: () =>
      import(/* webpackChunkName: "Error404" */ "@/views/Error404View.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

import { authenticated } from "@/helpers/auth";

// async function isAuthenticated() {
//   console.log("isAuthenticated index");
//   const response = await authenticated();
//   console.log(response);
//   const data = await response.json();
//   console.log(data);
//   return response.status;
// }

//TODO: GUARDS PARA FIJARME QUE ESTE EL NICK EN EL LOCAL, SI NO ESTA NO ESTA LOGUEADO, to.name !== "login" ES PARA QUE NO ME REDIRIJA INFINITAMENTE PORQUE SI NO ESTA YO REDIRIJO PERO EL LOCAL SIGUE VACIO Y VUELVE A ENTRAR AL IF (EN REALIDAD NO DEBERIA ENTRAR PORQUE ESTA EL RETURN Y CORTARIA EL FLUJO, PERO EN LA DOCU ESTA ASI (CREO QUE EL RETURN NO CORTA SINO QUE ES PARA REDIRIJIR NADA MAS)), ENTONCES ME FIJO QUE ESTE VACIO EL LOCAL Y LA RUTA A LA QUE ESTOY LLENDO SEA DIFERENTE A LOGIN
//to.name !== "registrar" para que me deje entrar a registar, si yo quiero ir a registrar el to.name me va dar false y no entra al if
//TODO:PUSE EL ASYNC async (to, from) PARA TENER ADENTRO AL AWAIT DE LA CONSULTA AL ENDPOINT DONDE ME FIJO QUE ESTE AUTENTIFICADO
router.beforeEach(async (to, from) => {
  //TODO:COMO SE EJECUTABA DOS VECES EL AUTH CUANDO IBA DE LOGIN (SIN EL QUERY) A OTRO (EJ HOME) PORQUE PRIMERO HACIA EL AUTH PARA HOME COMO ERA 401 ENTRABA AL IF, ME REDIRIJIA A LOGIN OTRA VEZ, HACIA EL AUTH Y COMO ME REDIRIJE A LOGIN NO ME DA 401 Y SE CORTA EL FLUJO, ENTONCES SI VOY A LOGIN NO QUIERO QUE AUTENTIFIQUE ENTONCES CORTO EL FLUJO ANTES DEL authenticated()
  //console.log(to);
  //console.log(from);
  console.log("isAuthenticated no entro");
  if (to.name != "login" && to.name !== "registrar" && to.name !== "home") {
    console.log("isAuthenticated si entro");
    const response = await authenticated();
    // console.log(response);

    if (response.status == 401) {
      console.log("isAuthenticated entro al 401");
      // reject the navigation
      console.log(to);
      console.log(from);
      console.log("guards");
      return {
        name: "login",
        query: { msg: "Necesita iniciar sesion para continuar" },
      };
    }
  }

  ///////////OTRAS OPCIONES PASADAS///
  // isAuthenticated();

  /////////////1////////////////////
  // let auth = isAuthenticated().then((response) => {
  //   return response;
  // });

  // async function statusDevuelto() {
  //   //console.log(await auth);
  //   let valor = "";
  //   return (valor = await auth);
  // }

  // const status = statusDevuelto();
  // console.log(status);

  /////////////2////////////////////
  // isAuthenticated().then((response) => {
  //   console.log(response);
  //   if (
  //     response == 401 &&
  //     to.name !== "login" &&
  //     to.name !== "registrar" &&
  //     to.name !== "registrar"
  //   ) {
  //     console.log("isAuthenticated no logueado");

  //     return {
  //       name: "login",
  //       query: { msg: "Necesita iniciar sesion para continuar" },
  //     };
  //   }
  // });

  /////////////3////////////////////

  // async function isAuthenticated() {
  //   console.log("isAuthenticated index");
  //   const response = await authenticated();
  //   console.log(response);
  //   // const data = await response.json();
  //   // console.log(data);

  //   if (
  //     response.status == 401 &&
  //     to.name !== "login" &&
  //     to.name !== "registrar"
  //   ) {
  //     console.log("isAuthenticated no logueado");
  //     console.log(to);
  //     console.log(from);
  //     console.log("guards");
  //     router.push({
  //       name: "login",
  //       query: { msg: "Necesita iniciar sesion para continuar" },
  //     });
  //   }
  // }

  /////////////4////////////////////
  // let status = "";

  // async function isAuthenticated() {
  //   console.log("isAuthenticated index");
  //   const response = await authenticated();
  //   console.log(response);
  //   // const data = await response.json();
  //   // console.log(data);
  //   status = 401;
  // }

  // if (status == 401 && to.name !== "login" && to.name !== "registrar") {
  //   console.log("isAuthenticated no logueado");
  //   console.log(to);
  //   console.log(from);
  //   console.log("guards");
  //   router.push({
  //     name: "login",
  //     query: { msg: "Necesita iniciar sesion para continuar" },
  //   });
  // }

  /////////////5////////////////////

  //const local = localStorage.getItem("name");
  //console.log(data);
  // if (
  //   !local &&
  //   to.name !== "login" &&
  //   to.name !== "registrar" &&
  //   to.name !== "home"
  // ) {
  //   // reject the navigation
  //   console.log(to);
  //   console.log(from);
  //   console.log("guards");
  //   console.log(local);
  //   return {
  //     name: "login",
  //     query: { msg: "Necesita iniciar sesion para continuar" },
  //   };
  // }
});

export default router;
