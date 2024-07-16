<template>
  <div
    v-if="loading"
    class="spinner-border text-secondary d-flex m-auto"
    role="status"
  >
    <span class="visually-hidden">Loading...</span>
  </div>

  <Form
    v-else
    @submit="updatePostComp"
    class="row card border-dark"
    v-slot="{ errors, isSubmitting }"
    :validation-schema="schema"
  >
    <div class="mb-3 card-header">
      <label
        for="exampleFormControlInput1"
        class="form-label d-flex justify-content-start"
        >Titulo</label
      >
      <Field
        v-model="this.posts.title"
        type="text"
        class="form-control"
        :class="{
          'is-invalid': errors.title,
        }"
        id="exampleFormControlInput1"
        placeholder="Ingrese el titulo"
        name="title"
        :validateOnInput="true"
        disabled
      />
      <ErrorMessage name="title" class="d-flex invalid-feedback" />
    </div>
    <div class="mb-3 card-body">
      <label
        for="exampleFormControlTextarea1"
        class="form-label d-flex justify-content-start"
        >Texto</label
      >

      <Field
        v-slot="{ field }"
        name="body"
        :validateOnInput="true"
        v-model="this.posts.body"
      >
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
import { getPostSlug, updatePost } from "@/helpers/posts";

//
import { Form, Field, ErrorMessage } from "vee-validate";

//
import * as yup from "yup";

export default {
  name: "CardEditarPost",

  components: {
    Form,
    Field,
    ErrorMessage,
  },

  async mounted() {
    try {
      await this.showPostSlug();
      this.loading = false;
    } catch (error) {
      console.log(error);
    }
  },

  props: { slug: { type: String, required: true } },

  data() {
    return {
      //yup
      schema: yup.object({
        title: yup.string().required("Este campo es obligatorio."),
        body: yup.string().required("Este campo es obligatorio."),
      }),

      //

      posts: {},
      loading: true,
    };
  },

  methods: {
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

    async updatePostComp(values, actions) {
      try {
        const postCard = this.posts;
        //aca puedo usar el id de posts de data xq ya tengo guardado el id en el objeto
        const response = await updatePost(postCard);
        const data = await response.json();
        console.log(data);

        //TODO: EL TITLE NO SE PUEDE MODIFICAR
        //si no se modifica el texto salta este error
        if (response.status == 400) {
          actions.setFieldError(
            "body",
            "Debe modificar el texto si quiere editar el post, sino no se efectuara ningun cambio."
          );
          return;
        }

        this.$router.push({ name: "home" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.spinner-border {
  width: 4rem;
  height: 4rem;
}
</style>
