<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <form class="d-flex order-lg-2 mb-lg-0 mb-2 mt-lg-0 mt-4" role="search">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>

        <ul class="navbar-nav mb-2 mb-lg-0 col order-lg-1">
          <li class="nav-item">
            <router-link
              :to="{ name: 'home' }"
              aria-current="page"
              class="nav-link active"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'new' }" class="nav-link"
              >Nuevo</router-link
            >
          </li>

          <li>
            <router-link :to="{ name: 'posts' }" class="nav-link"
              >Mis posts
            </router-link>
          </li>

          <!-- <li class="nav-item">
            <router-link
              v-if="this.userName"
              :to="{ name: 'profile', params: { user: this.userName } }"
              class="nav-link"
              >Usuario</router-link
            >

            <router-link v-else :to="{ name: 'login' }" class="nav-link"
              >Usuario</router-link
            >
          </li> -->
        </ul>

        <div
          class="col d-flex justify-content-center justify-content-lg-end order-lg-3 mb-lg-0 mb-2"
        >
          <router-link
            v-if="this.userName"
            :to="{ name: 'profile', params: { user: this.userName } }"
            class="nav-link"
          >
            <span class="text-white me-1">{{ this.userName }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-person"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"
              />
            </svg>
          </router-link>

          <router-link v-else :to="{ name: 'login' }" class="nav-link">
            <span class="text-white me-1">Login</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-person"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"
              />
            </svg>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavComp",

  data() {
    return {
      userName: "",
    };
  },

  props: {
    cambioNavLogout: { type: String, required: true },
    cambioNavLogin: { type: String, required: true },
  },

  created() {
    this.userName = localStorage.getItem("name");
    console.log("created NAV");
  },

  updated() {
    //console.log(this.cambioNavLogout);
    // console.log(this.cambioNavLogin + " updated cambioNavLogin");
    this.userName = localStorage.getItem("name");
    console.log("updated NAV");
  },

  methods: {},
};
</script>

<style scoped>
.bi {
  color: white;
}
</style>
