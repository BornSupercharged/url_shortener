import axios from "axios";
import Cookies from "js-cookie";
import * as types from "../mutation-types";

// state
export const state = {
  links: [],
};

// getters
export const getters = {
  links: (state) => state.links,
};

// mutations
export const mutations = {
  [types.SAVE_URL](state, { links }) {
    state.links = links;
  },
  [types.ADD_URL](state, { links }) {
    state.links = [...state.links, { ...links }];
  },
};

// actions
export const actions = {
  async saveUrl({ commit }, { url }) {
    try {
      const { data } = await url.post("links");
      commit(types.ADD_URL, { links: data });
      url.reset();
    } catch (e) {
      console.log(e);
    }
  },
  async getUrls({ commit }) {
    try {
      const { data } = await axios.get("links");
      commit(types.SAVE_URL, { links: data });
    } catch (e) {
      console.log(e);
    }
  },
};
