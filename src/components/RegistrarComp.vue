<template>
  <h2>REGISTRO</h2>

  <!-- TODO:ME FIJO SI HAY ERRORES, SI HAY SE MEUSTRAN TODOS LOS QUE TENGA, RECIBO UN ARRAY DE OBJETOS Y LO RECORRO E IMPRIMO LOS MSG -->
  <!-- LOS ERRORES LOS TRAIGO DIRECTO DE LA API -->
  <!-- SI NO TUVIERA EL V-FOR EN EL IF TENDRIA QUE PONER OTRA VARIABLE -->
  <div
    v-if="errors"
    v-for="e in errors"
    :key="e"
    class="alert alert-danger"
    role="alert"
  >
    {{ e.msg }}
  </div>

  <!-- hay que sacar el prevent -->
  <!-- v-slot="{ errors }" para acceder a todos los errores, lo uso para :class -->
  <Form
    @submit="registerUser"
    :validation-schema="schema"
    v-slot="{ errors, isSubmitting }"
  >
    <div class="row">
      <div class="mb-3 col-12">
        <label
          for="exampleFormControlInput9"
          class="form-label d-flex justify-content-start"
          >Nickname</label
        >
        <Field
          type="text"
          class="form-control"
          :class="{
            'is-invalid': errors.nickname,
          }"
          id="exampleFormControlInput9"
          name="nickname"
          placeholder="Juan123"
          :validateOnInput="true"
        />
        <ErrorMessage name="nickname" class="d-flex invalid-feedback" />
      </div>
    </div>

    <div class="row">
      <div class="mb-3 col-6">
        <label
          for="exampleFormControlInput1"
          class="form-label d-flex justify-content-start"
          >Nombre</label
        >
        <Field
          type="text"
          class="form-control"
          :class="{
            'is-invalid': errors.name,
          }"
          id="exampleFormControlInput1"
          name="name"
          placeholder="Juan"
          :validateOnInput="true"
        />
        <ErrorMessage name="name" class="d-flex invalid-feedback" />
      </div>

      <div class="mb-3 col-6">
        <label
          for="exampleFormControlInput2 "
          class="form-label d-flex justify-content-start"
          >Apellido</label
        >
        <Field
          type="text"
          class="form-control"
          :class="{
            'is-invalid': errors.last_name,
          }"
          id="exampleFormControlInput2"
          name="last_name"
          placeholder="Perez"
          :validateOnInput="true"
        />
        <ErrorMessage name="last_name" class="d-flex invalid-feedback" />
      </div>
    </div>

    <div class="row">
      <div class="mb-3 col-6">
        <label
          for="exampleFormControlSelect5"
          class="form-label d-flex justify-content-start"
          >Genero</label
        >
        <Field
          as="select"
          id="exampleFormControlSelect5"
          class="form-select"
          :class="{
            'is-invalid': errors.genero,
          }"
          aria-label="Default select example"
          name="genero"
          :validateOnInput="true"
        >
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
          <option value="O">Otro</option>
        </Field>

        <ErrorMessage name="genero" class="d-flex invalid-feedback" />
      </div>

      <div class="mb-3 col-6">
        <label
          for="exampleFormControlInput6"
          class="form-label d-flex justify-content-start"
          >Fecha de nacimiento</label
        >
        <Field
          type="date"
          class="form-control"
          :class="{
            'is-invalid': errors.fecha_nacimiento,
          }"
          id="exampleFormControlInput6"
          name="fecha_nacimiento"
          :validateOnInput="true"
        />
        <ErrorMessage name="fecha_nacimiento" class="d-flex invalid-feedback" />
      </div>
    </div>

    <div class="row">
      <div class="mb-3 col-6">
        <label
          for="exampleFormControlInput3 "
          class="form-label d-flex justify-content-start"
          >Email</label
        >

        <!-- saque en valid el submitEnter para que me muestre el mensaje cuando el email este correcto sin necesidad de tocar enviar y lo saca si el email vuelve a esatr mal, esto es por las variables en los if de func -->
        <!-- LO SAQUE           
          :rules="validateEmail"
          :validateOnBlur="false"
          :validateOnInput="true" -->

        <!-- :class="{
            'is-invalid': this.errorEmailVeeValidate && this.submitEnter,
            'is-valid': this.acceptEmailVeeValidate,
          }" -->
        <Field
          type="email"
          class="form-control"
          :class="{
            'is-invalid': errors.email,
          }"
          id="exampleFormControlInput3"
          name="email"
          placeholder="name@example.com"
          :validateOnInput="true"
        />
        <ErrorMessage name="email" class="d-flex invalid-feedback" />
      </div>

      <div class="mb-3 col-6">
        <label
          for="exampleFormControlInput4"
          class="form-label d-flex justify-content-start"
          >Confirmar email</label
        >

        <!-- LO SAQUE           
          :rules="validateConfirmEmail"
          :validateOnBlur="false"
          :validateOnInput="true" -->

        <!-- :class="{
            'is-invalid': this.errorConfirmEmailVeeValidate && this.submitEnter,
            'is-valid': this.acceptConfirmEmailVeeValidate,
          }" -->

        <Field
          type="email"
          class="form-control"
          :class="{
            'is-invalid': errors.confirm_email,
          }"
          id="exampleFormControlInput4"
          name="confirm_email"
          placeholder="name@example.com"
          :validateOnInput="true"
        />
        <ErrorMessage name="confirm_email" class="d-flex invalid-feedback" />
      </div>
    </div>

    <div class="row">
      <div class="mb-3 col-6">
        <label
          for="exampleFormControlInput7 "
          class="form-label d-flex justify-content-start"
          >Contraseña</label
        >
        <Field
          type="password"
          class="form-control"
          :class="{
            'is-invalid': errors.password,
          }"
          id="exampleFormControlInput7"
          name="password"
          placeholder="Contraseña"
          :validateOnInput="true"
        />
        <ErrorMessage name="password" class="d-flex invalid-feedback" />
      </div>

      <div class="mb-3 col-6">
        <label
          for="exampleFormControlInput8"
          class="form-label d-flex justify-content-start"
          >Repetir contraseña</label
        >
        <Field
          type="password"
          class="form-control"
          :class="{
            'is-invalid': errors.confirm_password,
          }"
          id="exampleFormControlInput8"
          name="confirm_password"
          placeholder="Repetir contraseña"
          :validateOnInput="true"
        />
        <ErrorMessage name="confirm_password" class="d-flex invalid-feedback" />
      </div>
    </div>

    <!-- el click lo tengo para que cuando entro a la pagina no me muestre de una el mensaje de error de que esta vacio, xq la funcion validate se ejecuta apenas entro a la pagina y cuando escribo (en el evento keydown) -->
    <button class="btn btn-dark" @click="this.submitEnter = true">
      Enviar
    </button>

    <!-- TODO: DSPS SACAR -->
    <!-- isSubmitting, para mostrar spiner en el proceso de envio -->
    <div
      v-if="isSubmitting"
      class="spinner-border text-secondary d-flex m-auto mt-2"
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
  </Form>
</template>

<script>
import { newUser } from "@/helpers/auth";

//
import { Form, Field, ErrorMessage } from "vee-validate";

//
import * as yup from "yup";

export default {
  name: "RegistrarComp",

  components: {
    Form,
    Field,
    ErrorMessage,
  },

  data() {
    return {
      //yup
      schema: yup.object({
        nickname: yup
          .string()
          .matches(/^\S+$/gm, "No puede contener espacios en blanco.")
          .required("Este campo es obligatorio."),
        name: yup.string().required("Este campo es obligatorio."),
        last_name: yup.string().required("Este campo es obligatorio."),
        genero: yup.string().required("Este campo es obligatorio."),
        fecha_nacimiento: yup.string().required("Este campo es obligatorio."),
        email: yup
          .string()
          .email("El email no es valido.")
          .required("Este campo es obligatorio."),
        confirm_email: yup
          .string()
          .email("El email no es valido.")
          .oneOf([yup.ref("email"), null], "El email no coincide")
          .required("Este campo es obligatorio."),
        password: yup
          .string()
          .min(8, "La contraseña debe tener al menos 8 caracteres.")
          .required("Este campo es obligatorio."),
        confirm_password: yup
          .string()
          .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden")
          .required("Este campo es obligatorio."),
      }),
      //TODO: PARA QUE EL NULL??????????

      //
      // newUser: {
      //   name: "",
      //   last_name: "",
      //   genero: "",
      //   fecha_nacimiento: "",
      //   email: "",
      //   nickname: "",
      //   confirm_email: "",
      //   password: "",
      //   confirm_password: "",
      // },

      errors: [],

      // errorEmailVeeValidate: false,
      // acceptEmailVeeValidate: false,

      // errorConfirmEmailVeeValidate: false,
      // acceptConfirmEmailVeeValidate: false,

      submitEnter: false,
    };
  },

  methods: {
    //VEE-VALIDATE

    //en los if puse el this.submitEnter xq si yo clickeaba el input y despues desclickeaba (evento blur) me aparecia el mensaje, entonces agregando el this.submitEnter evito que me muestre el mesnaje hasta que no clicke el boton de enviar
    //lo arregle con validateOnBlur al estar en falso si desclickeo no me aparece el mensaje hasta que no toco para enviar, igaul se ejecuta la funcion al inicio, y tambien so
    // validateEmail(value) {
    //   // if the field is empty
    //   if (!value) {
    //     console.log("!value");
    //     this.errorEmailVeeValidate = true;
    //     this.acceptEmailVeeValidate = false;
    //     return "Este campo es obligatorio.";
    //   }
    //   // if the field is not a valid email
    //   const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    //   if (!regex.test(value)) {
    //     console.log("regex");
    //     this.errorEmailVeeValidate = true;
    //     this.acceptEmailVeeValidate = false;
    //     return "El email no es valido.";
    //   }
    //   // All is good
    //   this.errorEmailVeeValidate = false;
    //   this.acceptEmailVeeValidate = true;
    //   return true;
    // },

    // validateConfirmEmail(value) {
    //   // if the field is empty
    //   if (!value) {
    //     console.log("!value");
    //     this.errorConfirmEmailVeeValidate = true;
    //     this.acceptConfirmEmailVeeValidate = false;
    //     return "Este campo es obligatorio.";
    //   }
    //   // if the field is not a valid email
    //   const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    //   if (!regex.test(value)) {
    //     console.log("regex");
    //     this.errorConfirmEmailVeeValidate = true;
    //     this.acceptConfirmEmailVeeValidate = false;
    //     return "El email no es valido.";
    //   }
    //   // All is good
    //   this.errorConfirmEmailVeeValidate = false;
    //   this.acceptConfirmEmailVeeValidate = true;
    //   return true;
    // },

    //
    async registerUser(values, actions) {
      try {
        const userCard = values;
        console.log(userCard);

        const response = await newUser(userCard);
        console.log(response);

        const data = await response.json();
        console.log(data);

        //TODO:POR AHORA LO SAQUE
        //si el email ya esta registrado, imprimo el msg y corto el flujo
        // if (data.msg) {
        //   return console.log(data.msg);
        // }

        //TODO: ESTO SIRVE PARA MOSTRAR EL ERROR DE EMAIL YA EXISTE (QUE SE NECESITA CONSULTAR A LA DB PARA SABER ESTO) COMO LOS OTROS ERRORES QUE SON VALIDACIONES EN EL FRONT
        // if (data.errors[0].msg === "El email ya esta registrado.") {
        //   actions.setFieldError("email", "El email ya esta registrado.");
        //   return console.log("El email ya esta registrado vee-validate");
        // }

        if (data.errors) {
          data.errors.forEach((element) => {
            if (element.msg === "El email ya esta registrado.") {
              actions.setFieldError("email", "El email ya esta registrado.");
            }
            if (element.msg === "El nick ya esta registrado.") {
              actions.setFieldError("nickname", "El nick ya esta registrado.");
            }
          });
          return;
        }

        //POR AHORA LO SAQUE PARA QUE SE MUESTRE EL ERROR DE ARRIBA NADA MAS
        //si existe errores imprimo c/u y corto el flujo, si no hay errores redirijo a home
        // if (data.errors) {
        //   console.log(data.errors);
        //   this.errors = data.errors;
        //   return data.errors.forEach((element) => console.log(element.msg));
        // }

        ///TODO:REVISAR ESTO NO PUDE CON CONNECT FLASH, POR PARAMS ESTA DEPRECADO(PASAR PARAMS QUE NO SE USAN EN LA RUTA)

        this.$router.replace({
          name: "login",
          query: { msg: data[1].msg },
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
