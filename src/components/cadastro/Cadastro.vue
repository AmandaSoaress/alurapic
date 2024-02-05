<template>
  <div>
    <h1 class="centralizado">Cadastro</h1>
    <h2 class="centralizado">{{ foto.titulo }}</h2>

    <form @submit.prevent="grava()">
      <div class="controle">
        <label for="titulo">TÍTULO</label>
        <input
          id="titulo"
          autocomplete="off"
          @input="foto.titulo = $event.target.value"
          :value="foto.titulo"
        />
      </div>

      <div class="controle">
        <label for="url">URL</label>
        <input
          id="url"
          autocomplete="off"
          @input="foto.url = $event.target.value"
          :value="foto.url"
        />
        <imagem-responsiva />
      </div>

      <div class="controle">
        <label for="descricao">DESCRIÇÃO</label>
        <textarea
          id="descricao"
          autocomplete="off"
          @input="foto.descricao = $event.target.value"
          :value="foto.descricao"
        >
        </textarea>
      </div>

      <div class="centralizado">
        <meu-botao rotulo="GRAVAR" tipo="submit" />
        <router-link to="/"
          ><meu-botao rotulo="VOLTAR" tipo="button"
        /></router-link>
      </div>
    </form>
  </div>
</template>

<script>
import ImagemResponsiva from "../shared/imagem-responsiva/ImagemResponsiva.vue";
import Botao from "../shared/botao/Botao.vue";

export default {
  components: {
    "imagem-responsiva": ImagemResponsiva,
    "meu-botao": Botao,
  },
  data() {
    return {
      foto: {
        titulo: "",
        url: "",
        descricao: "",
      },
    };
  },

  methods: {
    grava() {
      console.log("enviar dados para a API");
      this.foto = {
        titulo: "",
        url: "",
        descricao: ""
      };
    },
  },
};
</script>
<style scoped>
.centralizado {
  text-align: center;
  font-family: math;
  text-transform: uppercase;
  color: white;
  font-size: 50px;
  text-shadow: -1px -1px 0px #000000, -1px 1px 0px #000000, 1px -1px 0px #000000,
    1px 0px 0px #000000;
}
.controle {
  font-size: 1.2em;
  margin-bottom: 20px;
  font-family: math;
}
.controle label {
  display: block;
  font-weight: bold;
  font-family: math;
}

.controle label + input,
.controle textarea {
  width: 100%;
  font-size: inherit;
  border-radius: 5px;
  font-family: math;
}

.centralizado {
  text-align: center;
}
</style>
