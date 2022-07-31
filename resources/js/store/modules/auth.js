import axios from "axios";
import Cookies from "js-cookie";
import * as types from "../mutation-types";

// state
export const state = {
  token: Cookies.get("token"),
  user: null,
};

// getters
export const getters = {
  auth: (state) => state.user,
  token: (state) => state.token,
  loggedIn: (state) => !!state.user,
};

// mutations
export const mutations = {
  [types.SAVE_TOKEN](state, { token }) {
    state.token = token;
    Cookies.set("token", token, { expires: 365 });
  },

  [types.FETCH_USER_FAILURE](state) {
    state.token = null;
    Cookies.remove("user");
    Cookies.remove("token");
  },
  [types.LOGOUT](state) {
    state.user = null;
    state.token = null;
    Cookies.remove("token");
    Cookies.remove("user");
  },
  [types.FETCH_USER_SUCCESS](state, { user }) {
    state.user = user;
    Cookies.set("user", JSON.stringify(user), { expires: 365 });
  },
};

// actions
export const actions = {
  saveToken({ commit, dispatch }, payload) {
    commit(types.SAVE_TOKEN, payload);
  },
  async fetchUser({ commit }) {
    try {
      const { data } = await axios.get("user");
      commit(types.FETCH_USER_SUCCESS, { user: data });
    } catch (e) {
      commit(types.FETCH_USER_FAILURE);
    }
  },
  async logout({ commit }) {
    try {
      await axios.post("logout");
    } catch (e) {}
    commit(types.LOGOUT);
  },
};
