<template>
  <div class="row">
    <div
      v-if="error"
      class="alert alert-danger msg-validation-form"
      role="alert"
    >
      {{ this.error }}
    </div>
  </div>

  <Form
    @submit="setPost"
    class="row card"
    v-slot="{ errors, isSubmitting }"
    :validation-schema="schema"
  >
    <div class="mb-3 card-header col-12">
      <label
        for="exampleFormControlInput1"
        class="form-label d-flex justify-content-start"
        >Titulo</label
      >
      <Field
        type="text"
        class="form-control"
        :class="{
          'is-invalid': errors.title,
        }"
        id="exampleFormControlInput1"
        placeholder="Ingrese el titulo"
        name="title"
        :validateOnInput="true"
      />
      <ErrorMessage name="title" class="d-flex invalid-feedback" />
    </div>
    <div class="mb-3 card-body">
      <label
        for="exampleFormControlTextarea1"
        class="form-label d-flex justify-content-start"
        >Texto</label
      >
      <Field v-slot="{ field }" name="body" :validateOnInput="true">
        <textarea
          v-bind="field"
          class="form-control"
          :class="{
            'is-invalid': errors.body,
          }"
          id="exampleFormControlTextarea1"
          placeholder="Ingrese el texto"
          rows="3"
          name="body"
        />
      </Field>
      <ErrorMessage name="body" class="d-flex invalid-feedback" />
    </div>
    <div class="d-flex justify-content-end mb-3">
      <button class="btn btn-dark">Enviar</button>
    </div>
  </Form>
</template>

<script>
import { newPosts } from "@/helpers/posts";

//
import { Form, Field, ErrorMessage } from "vee-validate";

//
import * as yup from "yup";

export default {
  name: "CardNewPost",

  components: {
    Form,
    Field,
    ErrorMessage,
  },

  data() {
    return {
      //yup
      schema: yup.object({
        title: yup.string().required("Este campo es obligatorio."),

        body: yup.string().required("Este campo es obligatorio."),
      }),

      //
      error: "",
    };
  },

  methods: {
    async setPost(values, actions) {
      try {
        const postCard = values;

        const response = await newPosts(postCard);
        console.log(response);
        const data = await response.json();
        console.log(data);

        if (response.status == 400) {
          actions.setFieldError(
            "title",
            "El titulo ya existe. Por favor introduzca uno nuevo."
          );

          return (this.error = data);
        }

        this.$router.push({ name: "home" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
