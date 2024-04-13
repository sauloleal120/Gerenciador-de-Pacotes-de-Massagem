<template >
  <div class="container">
    <div class="card" @click="toggleEditMode">
      <div class="cardOpen" v-if="editMode">
        Nome:
        <input
          class="input"
          @keyup.enter="rename"
          type="text"
          v-model="nomeVuex"
        />
        Pacote:
        <input
          class="input"
          @keyup.enter="rename"
          type="text"
          v-model="pacoteVuex"
        />

        Pendentes:
        <div class="pendentes-container">
          <input
            class="pendentes-input"
            @keyup.enter="rename"
            type="number"
            v-model="pendentesVuex"
            @input="handleInput"
          />
          <button @click="darBaixa(index)" class="btn-baixa">check</button>
        </div>

        <div>
          <ul
            class="nota-container"
            v-for="datas in listaDatas"
            :key="datas.id"
          >
            <li class="notaDoDia">
              Nota do dia: {{ datas.data }}

              <div v-if="datas.notaVisible">
                <textarea
                  class="nota-input"
                  type="text"
                  v-focus
                  v-model="datas.notaDoDia"
                />
                <button @click="datas.notaVisible = false">X</button>
              </div>
              <button @click="datas.notaVisible = true" v-else>Editar</button>
              <button @click="delNota(listaDatas, datas, index)">
                deletar
              </button>
            </li>
          </ul>
        </div>

        <button class="btn-mais" v-if="!editMode2" @click="details">
          mais
        </button>

        <div class="detail" v-if="editMode2">
          <p>E-mail:</p>
          <input
            class="input2"
            @keyup.enter="rename"
            type="text"
            v-model="emailVuex"
          />

          <DataNascimento :index="index" />

          <p>Telefone:</p>
          <input
            class="input2"
            @keyup.enter="rename"
            type="text"
            v-model="telVuex"
          />
          <p>Endereço:</p>
          <input
            class="input2"
            placeholder="Rua"
            @keyup.enter="rename"
            type="text"
            v-model="endRuaVuex"
          />
          <input
            placeholder="Nº"
            class="input2"
            @keyup.enter="rename"
            type="text"
            v-model="endNumVuex"
          />
          <input
            placeholder="Complemento"
            class="input2"
            @keyup.enter="rename"
            type="text"
            v-model="endCompVuex"
          />
          <input
            class="input2"
            placeholder="Bairro"
            @keyup.enter="rename"
            type="text"
            v-model="endBairroVuex"
          />
          <input
            class="input2"
            placeholder="Cidade"
            @keyup.enter="rename"
            type="text"
            v-model="endCidVuex"
          />
          <input
            class="input2"
            placeholder="CEP"
            @keyup.enter="rename"
            type="text"
            v-model="endCEPVuex"
          />
        </div>
        <br />
        <br />
        <div class="btnContainer">
          <button class="buttonCenter" @click="rename(index)">SALVAR</button>
          <button @click="del(id)" class="buttonRight">DEL</button>
        </div>
      </div>
      <div v-if="!editMode">
        <p><strong>Nome:</strong> {{ nomeVuex }}</p>
        <p><strong>Pacote:</strong> {{ pacoteVuex }}</p>
        <p :style="{ marginBottom: '10px' }">
          <strong>Pendentes:</strong> {{ pendentesVuex }}
        </p>

        <Pendentes :qtd="pendentesVuex" />
      </div>
    </div>
  </div>
</template>

<script>
import Store from "./store";
import Pendentes from "./Pendentes";
import Notas from "./Notas";
import DataNascimento from "./DataNascimento";

export default {
  props: {
    item: String,
    nome: String,
    pacote: String,
    pendentes: Number,
    email: String,
    end: Object,
    nascimento: String,
    tel: String,
    refName: String,
    key: String,
    chave: Number,
    id: Number,
    index: Number,
  },

  data() {
    return {
      toggleViewNota: false,
      toggleEditNota: false,
      largura: "150px",
      altura: "100px",
      editMode: false,
      editMode2: false,
      nomeVuex: this.nome,
      pacoteVuex: this.pacote,
      emailVuex: this.email,

      telVuex: this.tel,
      endRuaVuex: this.end.rua,
      endNumVuex: this.end.num,
      endCompVuex: this.end.comp,
      endBairroVuex: this.end.bairro,
      endCidVuex: this.end.cidade,
      endCEPVuex: this.end.cep,
      pendentesVuex: this.pendentes,
      listaPendentes: [],
      dataSelecionada: "" ? this.nascimento : this.nascimento,
      dataFormatada: "",
      // index: this.index,
      listaDatas: [],
    };
  },
  created() {
    this.carregarNotas();
  },

  methods: {
    //deletar nota
    delNota(listaDatas, objData, index) {
      console.log(index);
      let novaListaDatas = listaDatas.filter((item) => {
        return item.id !== objData.id;
      });
      this.listaDatas = novaListaDatas;
      Store.commit("renameDatas", { index: index, data: this.listaDatas });
    },
    handleInput() {
      if (this.pendentesVuex < 0) {
        this.pendentesVuex = 0;
      }
    },

    //carregar notas
    carregarNotas() {
      const notasDoItem = Store.state.lista[this.index].datas;

      this.listaDatas = notasDoItem.map((nota, index) => ({
        id: index,
        data: nota.data,
        notaVisible: true,
        notaDoDia: nota.notaDoDia,
      }));
    },
    toggleNota() {
      this.toggleEditNota = !this.toggleEditNota;
    },
    toggleEditMode() {
      this.editMode = true;

      if (this.editMode) {
        this.largura = "150px";
        this.altura = "250px";
      } else {
        this.largura = "300px";
        this.altura = "250px";
      }
    },

    del(id) {
      console.log("antes do filter->");
      let lista = Store.state.lista;
      let novaLista = lista.filter((item) => item.id !== id);
      this.lista = novaLista;
      console.log("novalista->");
      console.log(id);
      Store.commit("delete", novaLista);
    },

    done() {
      setTimeout(() => {
        this.editMode = !this.editMode;
        if (this.editMode === false) {
          this.largura = "150px";
          this.altura = "100px";
        } else {
          this.largura = "150px";
          this.altura = "200px";
        }
      }, 0);
      this.editMode2 = false;
    },
    //atualizar lista botão salvar no card
    rename(id) {
      console.log(this.id);
      console.log("Card: rename()");
      console.log(this.dataFormatada);
      Store.commit("rename", {
        index: this.index,
        id: this.id,
        nome: this.nomeVuex,
        pacote: this.pacoteVuex,
        pendentes: this.pendentesVuex,
        email: this.emailVuex,
        tel: this.telVuex,
        nascimento: this.nascimento,
        end: {
          comp: this.endCompVuex,
          cidade: this.endCidVuex,
          bairro: this.endBairroVuex,
          num: this.endNumVuex,
          rua: this.endRuaVuex,
          cep: this.endCEPVuex,
        },
      });
      this.$emit("atualizar-lista");

      this.done();
    },

    divPendentes() {
      let p = this.pendentesVuex.value;

      for (let i = 0; i <= p; i++) {
        this.listaPendentes.push("_");
        return this.listaPendentes;
        // console.log(this.listaPendentes.length)
      }
    },
    //checa o número máximo permitido para quantidade de pacotes
    checkMaxPen(x) {
      if (x > 10) {
        console.log("if");
        return "máx 10";
      } else {
        console.log("else");
        return x;
      }
    },

    //mais detalhes do card
    details() {
      this.editMode2 = true;
    },

    obterDataAtual() {
      const dataAtual = new Date();
      const dia = String(dataAtual.getDate()).padStart(2, "0");
      const mes = String(dataAtual.getMonth() + 1).padStart(2, "0"); // Mês começa do 0
      const ano = dataAtual.getFullYear();

      return `${dia}/${mes}/${ano}`;
    },

    darBaixa(index) {
      const idNota = new Date().getTime();
      this.pendentesVuex = this.pendentesVuex - 1;

      this.listaDatas.push({
        id: idNota,
        data: this.obterDataAtual(),
        notaVisible: false,
        notaDoDia: "",
      });

      Store.commit("renameDatas", {
        index: index,
        data: this.listaDatas,
      });
    },
  },
  components: {
    Pendentes,
    DataNascimento,
  },

  computed: {
    pendentesMaster() {
      return this.pendentes;
    },
    listaMaster() {
      return Store.state.lista;
    },
  },
};
</script>
<style scoped>
.nota-container {
  border: 2px solid #007bff; /* Cor da borda destacada */
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
  list-style-type: none;
}
.notaDoDia {
  margin-top: 0px; /* Adicione a margem superior desejada */
  margin-bottom: 15px; /* Adicione a margem inferior desejada */
  /* Outros estilos existentes da classe .notaDoDia */
}
.card {
  width: 300px;
  height: auto;
  margin: 20px;
  padding: 20px;
  background-color: #f7f7f7;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 20px;
}

.div-pendentes {
  background-color: red;
}
.card:hover {
  transform: scale(1.05);
}

.cardOpen {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 0px;
  padding-bottom: 0px;
}

.input {
  width: 150px;
  text-align: center;
  margin: 5px;
  font-size: 20px;

  margin: 5px;
  font-size: 20px;
  width: 140px; /* Defina a largura desejada */
  margin-right: 10px; /* Adicione um espaçamento à direita do input */
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}
.input2 {
  width: 150px;
  margin-bottom: 0px;
  font-size: 20px;
}
.btn-mais {
  margin-top: 25px;
}

.btn {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
}

.btn:hover {
  background-color: #0056b3;
}
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.detail p {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 0px;
  margin-top: 20px;
  padding-bottom: 0px;
}

.buttonContainer {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 100%; /* Certifique-se de que o container ocupe toda a largura disponível */
}

.buttonCenter {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  flex-grow: 1; /* Faz o botão "Concluído" crescer para ocupar o espaço disponível */
}

.buttonRight {
  background-color: red;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin-left: 10px; /* Adiciona um espaçamento entre os botões */
}
.data {
  height: 50px;
}

.pendentes-container {
  display: flex;
  align-items: center;
}

.pendentes-input {
  text-align: center;
  margin: 5px;
  font-size: 20px;
  width: 40px; /* Defina a largura desejada */
  margin-right: 10px; /* Adicione um espaçamento à direita do input */
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}

.btn-baixa {
  background-color: #28a745; /* Cor de fundo */
  color: white; /* Cor do texto */
  padding: 10px 5px;
  width: 50px;
  text-align: center;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  outline: none;
}

.btn-baixa:hover {
  background-color: #218838; /* Cor de fundo no hover */
}

.nota-input {
  width: 150px; /* Largura desejada */
  height: 70px; /* Altura desejada (mesmo valor que a largura) */
  padding: 10px; /* Preenchimento interno, se necessário */
  border: 1px solid #ccc; /* Borda, se desejado */
  border-radius: 10px;
  box-sizing: border-box; /* Evita que o preenchimento e a borda aumentem o tamanho total */
  word-wrap: break-word; /* Quebra de palavra para quebrar o texto quando atinge a borda */
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>