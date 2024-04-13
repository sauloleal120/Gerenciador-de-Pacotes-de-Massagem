<template>
  <div class="container">
    <div class="title">
      <h1 class="meu-h1">Profisio</h1>
      <p>Yasmim Olliver</p>
    </div>
    <Aniversario :lista="lista" />

    <div class="button-container">
      <button class="button" @click="showList">mostrar lista</button>
    </div>

    <Caixa @adicionar="addItem" />
    <Card
      v-for="(element, index) in listaMaster"
      :key="index"
      :id="element.id"
      :nome="element.nome"
      :pacote="element.pacote"
      :pendentes="element.pendentes"
      :email="element.email"
      :nascimento="element.nascimento"
      :tel="element.tel"
      :end="element.end"
      @atualizar-lista="upDateList"
      @atualizar="updatelist"
      :index="index"
    />
  </div>
</template>

<script>
import Caixa from "./components/Caixa";
import Card from "./components/Card";
import Store from "./components/store";
import Aniversario from "./components/Aniversario";

import db from "./firebase/init.js";
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";

export default {
  data() {
    return {
      lista: Store.state.lista,

      id: new Date().getTime(),
    };
  },
  components: {
    Caixa,
    Card,
    Aniversario,
  },
  methods: {
    addItem(item) {
      console.log("App: addItem");
      Store.state.lista.push({
        id: this.id,
        nome: item,
        pacote: "",
        pendentes: "",
        notaVisible: false,
        email: "",
        nascimento: "",
        mesNiver: 0,
        tel: "",
        end: { rua: "", num: "", comp: "", bairro: "", cidade: "", cep: "" },
        datas: [],
      });
      console.log("Store.state.lista:");
      console.log(Store.state.lista);
      this.id++;
      //this.createList();
      this.upDateList();
      //this.getList()
    },

    showList() {
      console.log(Store.state.lista);
    },

    async createList() {
      const listaObj = { lista: this.lista };

      const colRef = collection(db, "Lista-de-Pacotes");

      const docRef = await addDoc(colRef, listaObj);
      console.log(docRef.id);
    },
    async upDateList() {
      console.log("updatelist");
      const colRef = collection(db, "Lista-de-Pacotes");
      const listaObj = { lista: Store.state.lista };
      const myDocRef = doc(colRef, "QSpMjr2GvoQwC82qC5TU");
      await setDoc(myDocRef, listaObj);
    },
    async getList() {
      const docRef = doc(db, "Lista-de-Pacotes", "QSpMjr2GvoQwC82qC5TU");
      const listaAtual = await getDoc(docRef);
      const novaLista = listaAtual.data().lista;
      console.log(listaAtual.data().lista);
      Store.commit("listaFromFirebase", novaLista);
      return novaLista;
    },
  },
  beforeMount() {
    this.getList();
  },
  computed: {
    listaMaster() {
      return Store.state.lista;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
,
.container {
  display: flex;
  flex-direction: row;
}

.button-container {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}
.button {
  border-radius: 20px; /* Ajuste esse valor conforme necessário */
  padding: 10px 20px; /* Ajuste o padding para o tamanho desejado */
  background-color: #007bff; /* Cor de fundo do botão */
  color: white; /* Cor do texto no botão */
  border: none; /* Remova a borda se desejar */
  cursor: pointer;
  font-size: 25px;
}

.meu-h1 {
  margin-top: 0px;
  padding-top: 0px;
  height: 20px;
  font-size: 45px;
}
</style>