<template>
  <div>
    <button @click="fecharCaixaDeTexto" class="edit-button">Editar</button>

    <div class="text-area-container" v-if="isTextAreaVisible">
     <CardNotas/>

    </div>
  </div>
</template>

<script>

import CardNotas from "./CardNotas";

export default {
  data() {
    return {
      arrayDatas: [],
      isTextAreaVisible: false,
      textoEditavel: "Conteúdo Inicial",
    };
  },
  methods: {
    getDataAtualFormatada() {
      const data = new Date();
      const dia = String(data.getDate()).padStart(2, "0");
      const mes = String(data.getMonth() + 1).padStart(2, "0"); // Lembre-se que os meses são indexados de 0 a 11
      const ano = data.getFullYear();
      const dataFinal = `${dia}/${mes}/${ano}`;
      return dataFinal;
    },
    fecharCaixaDeTexto() {
      this.isTextAreaVisible = !this.isTextAreaVisible;
      this.$emit("incluir-data");
    },
  },
  components:{
    CardNotas,
  }
};
</script>

<style scoped>
.text-area-container {
  margin-top: 10px;
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.text-area {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical;
}

.edit-button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.edit-button:hover {
  background-color: #0056b3;
}
</style>
