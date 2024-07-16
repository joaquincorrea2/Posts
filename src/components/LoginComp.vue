<template>
  <div
    class="row justify-content-center align-items-center position-relative flex-column"
  >
    <!-- TODO: EL ALERT CUANDO VUELVO ATRAS (A ESTA PAGINA) SE VUELVE A MOSTAR PORQUE SE MANTIENE EL QUERY ENTONCES EL ALERT SE MUESTRA, NO LO PUDE SOLUCIONAR, IGUAL SI VOY DIRECTO AL LOGIN (NO SI TOCO PARA VOLVER ATRAS) AHI SI SE REINCIA-->

    <div
      v-if="this.$route.query.msg"
      class="alert alert-success alert-dismissible d-flex justify-content-start position-absolute col-12 col-lg-6 msg-query"
      role="alert"
    >
      <div>
        {{ this.$route.query.msg }}
      </div>

      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>

    <!-- COMO NO TENGO EL V-FOR EN EL IF TENGO QUE PONER OTRA VARIABLE -->
    <!-- SI PONGO FIXED NO ME ANDA BIEN EL ANCHO, COMO QUE NO ME TOMA EL CONTAINER-SM -->
    <div
      v-if="entrar"
      class="alert alert-danger position-absolute col-12 col-lg-6 msg-validation-form"
      role="alert"
    >
      {{ error }}
    </div>

    <Form
      @submit="loginUser"
      class="col-12 col-lg-6 m-auto rounded p-3 bg-light shadow-lg"
      :validation-schema="schema"
      v-slot="{ errors }"
    >
      <h2>Login</h2>
    
      <div class="mb-3">
        <label
          for="exampleInputEmail1"
          class="form-label d-flex justify-content-start"
          >Email</label
        >
        <Field
          type="email"
          class="form-control"
          :class="{
            'is-invalid': errors.email,
          }"
          id="exampleInputEmail1"
          name="email"
          aria-describedby="emailHelp"
          :validateOnInput="true"
        />
        <ErrorMessage name="email" class="d-flex invalid-feedback" />
      </div>
      <div class="mb-3">
        <label
          for="exampleInputPassword1"
          class="form-label d-flex justify-content-start"
          >Contraseña</label
        >
        <Field
          type="password"
          class="form-control"
          :class="{
            'is-invalid': errors.password,
          }"
          name="password"
          id="exampleInputPassword1"
          :validateOnInput="true"
        />
        <ErrorMessage name="password" class="d-flex invalid-feedback" />
      </div>
      <div class="d-flex justify-content-between">
        <small class="d-flex align-items-center"
          >¿No tenes cuenta?
          <router-link :to="{ name: 'registrar' }" class="nav-link ps-1">
            Registrate
          </router-link></small
        >
        <button type="submit" class="btn btn-dark">Submit</button>
      </div>
    </Form>
  </div>
</template>

<script>
import { signUser } from "@/helpers/auth";

//
import { Form, Field, ErrorMessage } from "vee-validate";

//
import * as yup from "yup";

export default {
  name: "LoginComp",

  components: {
    Form,
    Field,
    ErrorMessage,
  },

  //  props: { msgg: { type: Object } },

  data() {
    return {
      //yup
      schema: yup.object({
        email: yup
          .string()
          .email("El email no es valido.")
          .required("Este campo es obligatorio."),

        password: yup
          .string()
          .min(8, "La contraseña debe tener al menos 8 caracteres.")
          .required("Este campo es obligatorio."),
      }),

      //
      // signInUser: {
      //   email: "",
      //   password: "",
      // },

      entrar: false,

      error: [],

      name: "hola",
    };
  },

  //AGREAGAR SI FLTA CONTSAEÑA O EMAIL UNO DE LOS DOS SOLOS
  methods: {
    //TODO: SI PASO EL req.user O req.session TENGO QUE USAR EL DATA PERO ME DA ERROR CUANDO ME DEVUELVEN EL 401 PORQUE NO PUEDO PASARLO A JSON (SOLUCIONAR CON UN IF [REALIZADO]), EN EL RESPONSE TENGO LOS CODIGOS DE LOS STATUS
    async loginUser(values, actions) {
      try {
        const userCard = values;
        console.log(userCard);

        console.log(this.error);

        //me fijo que no haya campos vacios, sin necesidad de consultar la db, es una funcion del front
        if (!userCard.email && !userCard.password) {
          console.log(userCard);

          this.error = "Campos vacios.";
          //this.error = "Campos vacios";
          console.log(this.error);

          this.entrar = true;
          return console.log("Campos vacios");
        }

        //TIENE QUE IR DSPS DE LOS CAMPOS VACIOS SINO ENTRA PRIMERO AL DE EMAIL CUANDO ESTAN LOS DOS VACIOS
        if (!userCard.email) {
          this.error = "Falta email.";
          console.log(this.error);

          this.entrar = true;
          return console.log("Falta email");
        }
        if (!userCard.password) {
          this.error = "Falta contraseña.";
          console.log(this.error);

          this.entrar = true;
          return console.log("Falta contraseña");
        }

        const response = await signUser(userCard);
        console.log(response);

        //me fijo que venga el objeto user (req.user), si viene lo cambio a json, en realidad el Sesion iniciada es en el signUser
        if (response.status == 200) {
          const data = await response.json();
          console.log(data);

          //
          localStorage.setItem("name", data.nickname);

          //
          //this.$emit("tengo_resultados_login_loginComp", "login");

          //TODO: SI NO REDIRIJO NO ME TOMA LA SESSION CORRECTA Y USER XQ EL AUTHENTICATE LO EJECUTA DSPS DEL MID QUE IMPRIME LA SESSION Y EL USER
          this.$router.push({ name: "home" });
          //console.log("Sesion iniciada");
        }

        //si passport me devuelve el 401 es xq puso mal los datos
        //POR AHORA DEJO LOS DOS MENSAJES
        if (response.status == 401) {
          actions.setFieldError("email", " ");
          actions.setFieldError("password", "Email o Contraseña incorrectos.");

          this.entrar = true;
          this.error = "No autorizado. Email o Contraseña incorrectos.";
          return console.log("No autorizado. Email o Contraseña incorrectos");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.row {
  height: calc(100vh - 56px);
}

a:hover {
  text-decoration: underline;
}

.msg-validation-form {
  top: 5vh;
}

.msg-query {
  top: 15vh;
}
</style>
