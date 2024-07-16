<template>
  <!-- Button trigger modal -->
  <button
    type="button"
    class="btn btn-dark mb-3"
    data-bs-toggle="modal"
    data-bs-target="#staticBackdrop"
    @click="onClickModal()"
  >
    {{ this.btnModal }}
  </button>

  <!-- Modal -->
  <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <!-- <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1> -->
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <h3>¿Estas seguro de eliminar?</h3>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            No
          </button>
          <button @click="onClick(postId)" type="button" class="btn btn-dark">
            Si, eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardPostSlug",

  props: {
    btnModal: { type: String, required: true },
    onClick: Function,
    onClickModal: Function,
    postId: { type: String, required: true },
  },
};
</script>

<style scoped>
.modal {
  z-index: 1080;
}
</style>
