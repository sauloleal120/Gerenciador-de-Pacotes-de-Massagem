<template>
<div class="highlight">
    <p>Data de Nascimento:</p>
    <div v-if="!editMode">
      <p>{{ dataMaster }}</p>
      <button class="edit-button" @click="editMode = true">Editar</button>
    </div>
    <div v-else>
      <input type="date" v-model="dataSelecionada" @input="formatarData" />
      <button class="save-button" @click="salvarDataStore">Salvar</button>
    </div>
  </div>

</template>

<script>
import Store from "./store";

export default {
  props:{
    index: Number,
  },
data(){
return{
  dataSelecionada: undefined,
  dataFormatada: undefined,
  dataNascimento: Store.state.lista[this.index].nascimento,
  editMode: false,
  
}
},
methods:{



    formatarData() {
      if (this.dataSelecionada) {
        const partesData = this.dataSelecionada.split("-");
        if (partesData.length === 3) {
          const dia = partesData[2];
          const mes = partesData[1];
          const ano = partesData[0];
          this.dataFormatada = `${dia}/${mes}/${ano}`;
          const mesNum = parseInt(mes); 
          console.log(this.dataFormatada)
          this.salvarDataStore()
        }
      } else {
        this.dataFormatada = ""; // Caso a data seja nula

      }
     
    },

    salvarDataStore(){
        console.log('salvarDataStore')
      Store.commit("renameDataNascimento", {index: this.index, data: this.dataFormatada})
      this.editMode = !this.editMode
    }

},
computed:{
  dataMaster(){
    return Store.state.lista[this.index].nascimento
  }

}
}
</script>


<style scoped>
input[type="date"] {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}

.edit-button,
.save-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #007bff;
  text-decoration: underline;
  margin-left: 10px;
  padding: 0;
}

.edit-button:focus,
.save-button:focus {
  outline: none;
}

/* Estilo para destacar o componente */
.highlight {
  border: 2px solid #007bff; /* Cor da borda destacada */
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
}
</style>