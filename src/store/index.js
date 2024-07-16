import { getPosts } from "@/helpers/posts";
import { createStore } from "vuex";

export default createStore({
  state: {
    posts: [],
  },
  getters: {},
  mutations: {
    setPosts(state, payload) {
      state.posts = payload;
    },
  },
  actions: {
    async getPosts({ commit }) {
      try {
        const response = await getPosts();
        const data = await response.json();

        commit("setPosts", data);
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {},
});
