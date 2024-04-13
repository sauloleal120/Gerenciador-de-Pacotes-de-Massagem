<template>
  <div v-if="mostrar" class="divi_container">
    <div v-for="(item, index) in lista" :key="index" class="divi">
      <p>{{ item }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    qtd: Number,
  },
  data() {
    return {
      mostrar: true,
      lista: [],
      number: this.qtd,
    };
  },
  mounted() {
    this.div();
  },

  methods: {
    div() {
      for (let i = 0; i < this.number; i++) {
        this.lista.push(" ");
      }
    },
  },

  components: {},
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

.divi_container {
  display: flex;
  flex-direction: row;
  margin-bottom: -20px;
}
.divi {
  margin: 5px;
  height: 10px;
  background-color: green;
  width: 10px;
}
</style>
