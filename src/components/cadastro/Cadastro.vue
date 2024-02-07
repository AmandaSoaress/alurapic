<template>
  <div>
    <h1 class="centralizado">Cadastro</h1>
    <h2 class="centralizado">{{ foto.titulo }}</h2>

    <form @submit.prevent="grava()">
      <div class="controle">
        <label for="titulo">TÍTULO</label>
        <input id="titulo" autocomplete="off" v-model.lazy="foto.titulo" />
      </div>

      <div class="controle">
        <label for="url">URL</label>
        <input id="url" autocomplete="off" v-model.lazy="foto.url" />
        <imagem-responsiva
          v-show="foto.url"
          :url="foto.url"
          :titulo="foto.titulo"
        />
      </div>

      <div class="controle">
        <label for="descricao">DESCRIÇÃO</label>
        <textarea id="descricao" autocomplete="off" v-model="foto.descricao">
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
import Foto from "../../domain/foto/Foto";
import FotoService from "../../domain/foto/FotoService";

export default {
  components: {
    "imagem-responsiva": ImagemResponsiva,
    "meu-botao": Botao,
  },
  data() {
    return {
      foto: new Foto(),
    };
  },

  methods: {

    grava() {
      this.service
      .cadastra(this.foto)
      .then(() => this.foto = new Foto(), (err) => console.log(err));
    },
  },
  created() {
    this.service = new FotoService(this.$resource);
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
