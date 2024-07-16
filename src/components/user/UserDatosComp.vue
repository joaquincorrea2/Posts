<template>
  <div
    v-if="loading"
    class="spinner-border text-secondary d-flex m-auto"
    role="status"
  >
    <span class="visually-hidden">Loading...</span>
  </div>

  <div v-else>
    <form>
      <div class="row">
        <div class="mb-3 col-12">
          <label
            for="exampleFormControlInput9"
            class="form-label d-flex justify-content-start"
            >Nickname</label
          >
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput9"
            name="nickname"
            v-model="newUser.nickname"
            placeholder="Juan123"
            disabled
          />
        </div>
      </div>

      <div class="row">
        <div class="mb-3 col-12 col-sm-6">
          <label
            for="exampleFormControlInput1"
            class="form-label d-flex justify-content-start"
            >Nombre</label
          >
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
            name="name"
            v-model="newUser.name"
            placeholder="Juan"
            disabled
          />
        </div>

        <div class="mb-3 col-12 col-sm-6">
          <label
            for="exampleFormControlInput2 "
            class="form-label d-flex justify-content-start"
            >Apellido</label
          >
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput2"
            name="last_name"
            v-model="newUser.last_name"
            placeholder="Perez"
            disabled
          />
        </div>
      </div>

      <div class="row">
        <div class="mb-3 col-12 col-sm-6">
          <label
            for="exampleFormControlSelect5"
            class="form-label d-flex justify-content-start"
            >Genero</label
          >
          <select
            id="exampleFormControlSelect5"
            class="form-select"
            aria-label="Default select example"
            name="genero"
            v-model="newUser.genero"
            disabled
          >
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
            <option value="O">Otro</option>
          </select>
        </div>

        <div class="mb-3 col-12 col-sm-6">
          <label
            for="exampleFormControlInput6"
            class="form-label d-flex justify-content-start"
            >Fecha de nacimiento</label
          >
          <input
            type="date"
            class="form-control"
            id="exampleFormControlInput6"
            name="fecha_nacimiento"
            v-model="newUser.fecha_nacimiento"
            disabled
          />
        </div>
      </div>

      <div class="row">
        <div class="mb-3 col-12 col-sm-6">
          <label
            for="exampleFormControlInput3 "
            class="form-label d-flex justify-content-start"
            >Email</label
          >
          <input
            type="email"
            class="form-control"
            id="exampleFormControlInput3"
            name="email"
            v-model="newUser.email"
            placeholder="name@example.com"
            disabled
          />
        </div>

        <div class="mb-3 col-12 col-sm-6">
          <label
            for="exampleFormControlInput7 "
            class="form-label d-flex justify-content-start"
            >Contraseña</label
          >
          <input
            type="password"
            class="form-control"
            id="exampleFormControlInput7"
            name="password"
            value="123456"
            placeholder="Contraseña"
            disabled
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { getUserDatos } from "@/helpers/auth";

export default {
  name: "UserDatosComp",

  data() {
    return {
      newUser: {},
      loading: true,
    };
  },

  props: { user: { type: String, required: true } },

  created() {
    this.showUser();
    this.loading = false;
  },

  methods: {
    async showUser() {
      try {
        //const nickUser = localStorage.getItem("name");
        const response = await getUserDatos(this.user);
        const data = await response.json();
        this.newUser = data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
