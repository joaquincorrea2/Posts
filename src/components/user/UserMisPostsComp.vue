<template>
  <div
    v-if="loading"
    class="spinner-border text-secondary d-flex m-auto"
    role="status"
  >
    <span class="visually-hidden">Loading...</span>
  </div>

  <div v-else>
    <h3 v-if="this.posts.length == 0">
      Todavia no se crearon posts.
      <router-link :to="{ name: 'new' }" class="nav-link anchor d-inline">
        Podes crear desde aca!
      </router-link>
    </h3>
    <table v-else class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Title</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in posts" :key="p">
          <th scope="row" class="_id">
            <router-link
              :to="{ name: 'post', params: { slug: p.slug } }"
              class="nav-link"
            >
              {{ p._id }}
            </router-link>
          </th>
          <td class="">
            <p class="elipsis">{{ p.title }}</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getUserPosts } from "@/helpers/posts";

export default {
  name: "UserMisPostsComp",

  data() {
    return { posts: [], loading: true };
  },

  async mounted() {
    try {
      await this.showPostsComp();
      this.loading = false;
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    async showPostsComp() {
      try {
        const response = await getUserPosts();
        const data = await response.json();

        this.posts = data;
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
