// store.js

import { createStore } from "vuex";

export default createStore({
  state: {
    lista: [],
    listaNiver: []
  },

  mutations: {
    rename(state, payload) {
      state.lista[payload.index].nome = payload.nome;
      state.lista[payload.index].pacote = payload.pacote;
      state.lista[payload.index].pendentes = payload.pendentes;
      state.lista[payload.index].email = payload.email;
      state.lista[payload.index].tel = payload.tel;
      state.lista[payload.index].nascimento = payload.nascimento;
      state.lista[payload.index].end = payload.end;
    },
    renameDataNascimento(state, payload) {
      state.lista[payload.index].nascimento = payload.data;
      console.log("renameDataNascimento");
    },

    renamePendentes(state, payload) {
      state.lista[payload.index].pendentes = payload.pendentes;
    },

    renameDatas(state, payload) {
      state.lista[payload.index].datas = payload.data;
    },
    listaNiver(state, payload) {
      state.listaNiver = payload;
    },

    listaFromFirebase(state, payload) {
      state.lista = payload;
    },

    delete(state, payload) {
      state.lista = payload;
      console.log("a");
      console.log(payload);
      console.log("b");
    }
  },
  actions: {
    atualizarVariavelNaTelaPai({ commit }, novoValor) {
      commit("atualizarVariavelNaTelaPai", novoValor);
    }
  },
  modules: {}
});
