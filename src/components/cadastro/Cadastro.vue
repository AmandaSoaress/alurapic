<template>
  <div>
    <h1 class="centralizado">Cadastro</h1>
    <h2>{{ foto.titulo }}</h2>
    <h2 v-if="foto._id">Alterando</h2>
    <h2 v-else>Incluindo</h2>
    <form @submit.prevent="grava()">
      <div class="controle">
        <label for="titulo">TÍTULO</label>
        <input
          data-vv-as="título"
          name="titulo"
          v-validate
          data-vv-rules="required|min:3|max:30"
          id="titulo"
          autocomplete="off"
          v-model="foto.titulo"
        />
        <span class="erro" v-show="errors.has('titulo')">{{
          errors.first("titulo")
        }}</span>
      </div>

      <div class="controle">
        <label for="url">URL</label>
        <input
          name="url"
          v-validate
          data-vv-rules="required"
          id="url"
          autocomplete="off"
          v-model="foto.url"
        />
        <span class="erro" v-show="errors.has('url')">{{
          errors.first("url")
        }}</span>
        <imagem-responsiva
          v-show="foto.url"
          :url="foto.url"
          :titulo="foto.titulo"
          :grande="true"
        />
      </div>

      <div class="controle">
        <label for="descricao">DESCRIÇÃO</label>
        <textarea id="descricao" autocomplete="off" v-model="foto.descricao">
        </textarea>
      </div>

      <div class="centralizado">
        <meu-botao rotulo="GRAVAR" tipo="submit" />
        <router-link :to="{ name: 'home' }"
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
      id: this.$route.params.id,
    };
  },

  methods: {
    grava() {
      this.$validator.validateAll().then((success) => {
        if (success) {
          if (this.id) {
            this.service.atualiza(this.foto).then(
              () => {
                this.$router.push({ name: "home" });
              },
              (err) => console.log(err)
            );
          } else {
            this.service.cadastra(this.foto).then(
              () => {
                this.foto = new Foto();
                this.$router.push({ name: "home" });
              },
              (err) => console.log(err)
            );
          }
        }
      });
    },
  },
  created() {
    this.service = new FotoService(this.$resource);
    if (this.id) {
      this.service.busca(this.id).then((foto) => (this.foto = foto));
    }
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
h2 {
  text-decoration: underline;
  font-style: italic;
  font-family: math;
  text-align: center;
  color: black;
  font-size: 25px;
  text-shadow: white;
}
.centralizado {
  text-align: center;
}
.erro {
  color: white;
}
</style>
