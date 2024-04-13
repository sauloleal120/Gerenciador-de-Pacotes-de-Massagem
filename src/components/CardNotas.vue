<template>
  
  <div class="text-area-container" v-if="isTextAreaVisible">
      <textarea
        rows="4"
        cols="50"
        v-model="textoEditavel"
        @blur="fecharCaixaDeTexto"
        class="text-area"
      > oi </textarea>
      <p>oi</p>
    </div>
</template>

<script>
export default {

  data(){

    return{
      textoEditavel:"",

    }
  },
  methods:{

     fecharCaixaDeTexto() {
      this.isTextAreaVisible = !this.isTextAreaVisible;
      this.$emit("incluir-data");
    },
  },

}
</script>

<style>


.text-area-container {
  margin-top: 10px;
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

</style>