<template>
  <button @click="contarAniversariantes">mesAtual</button>
  <div @click="toggleNiverBar" v-if="listaAniversariantes.length >= 1">
    <div class="aniversariantes-container">
      <h1 class="aniversariantes-title">
        Aniversariantes do Mês: {{ listaAniversariantes.length }}
      </h1>
      <div v-for="item in listaAniversariantes" :key="item.id">
        <div v-if="niver">
          <div v-if="listaAniversariantes.length >= 1">
            <ul class="aniversariantes-list">
              <li class="aniversariante-item">
                nome: {{ item.nome }} | dia: {{ item.nascimento }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="aniversariante-container" v-else>
    <p>sem aniversariantes no mês</p>
  </div>
</template>

<script>
import Store from "./store";

export default {
  props: {},
  data() {
    return {
      niver: false,
      lista: Store.state.lista,
      qtd: 0,
      listaAniversariantes: [],
    };
  },
  computed: {
    listaMaster() {
      return this.lista;
    },
  },
  watch: {
    lista: {
      immediate: true,
      handler(newValue, oldValue) {
        this.contarAniversariantes();
      },
    },
  },

  created() {
    this.contarAniversariantes();
  },

  methods: {
    toggleNiverBar() {
      this.niver = !this.niver;
    },

   

    contarAniversariantes() {
      this.listaAniversariantes = [];
      const data = new Date();
      const mesAtual = data.getMonth() + 1;
    


      for (let i = 0; i < this.lista.length; i++) {
        if (this.lista[i].nascimento.length >= 1) {
          let mes_01 = this.lista[i].nascimento[3].toString();
          let mes_02 = this.lista[i].nascimento[4].toString();
          let mesSoma = mes_01 + mes_02;
          let mes = parseInt(mesSoma);
         
          if (mes === mesAtual) {
            this.listaAniversariantes.push({
              id: this.lista[i].id,
              nome: this.lista[i].nome,
              nascimento: this.lista[i].nascimento,
            });

          }
        }
      }
      //console.log(mesAtual);
      console.log("lista aniversariantes ->");
      console.log(this.listaAniversariantes);
      // return this.listaAniversariantes.length;
    },
  },
};
</script>

<style scoped>
.aniversariantes-container {
  background-color: #f7f7f7;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-top: 20px;
}

.aniversariantes-title {
  font-size: 24px;
  color: #007bff;
  margin-bottom: 10px;
}

.aniversariantes-list {
  list-style: none;
  padding: 0;
}

/* Estilos para cada item da lista de aniversariantes */
.aniversariante-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}

.aniversariante-info {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.aniversariante-name {
  font-weight: bold;
  font-size: 18px;
  color: #333;
}

.aniversariante-date {
  font-size: 14px;
  color: #666;
}

.parabenizar-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.parabenizar-button:hover {
  background-color: #0056b3;
}
</style>