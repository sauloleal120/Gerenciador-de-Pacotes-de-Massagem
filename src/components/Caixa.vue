<template>
  <input
    class="caixa"
    id="input"
    type="text"
    @keyup.enter="_addItem"
    v-model="_novoItem"
  />
</template>

<script>
export default {
  _novoItem: String,

  data() {
    return {};
  },
  methods: {
    _addItem() {
      this.$emit("adicionar", this._novoItem);
      document.getElementById("input").value = "";
    },
  },
};
</script>

<style>
.caixa {
  width: 50%;
  height: 35px;
  font-size: 25px;
}
</style>