<template>
  <div>
    <h1 class="centralizado">{{ titulo }}</h1>
    <p v-show="mensagem" class="centralizado">{{ mensagem }}</p>
    <input
      type="search"
      class="filtro"
      @input="filtro = $event.target.value"
      placeholder="Filtre por parte so título"
    />

    <ul class="lista-fotos">
      <li
        class="lista-fotos-item"
        v-for="foto of fotosComFiltro"
        :key="foto._id"
      >
        <meu-painel :titulo="foto.titulo">
          <imagem-responsiva
            v-meu-transform:scale.animate="1.2"
            :url="foto.url"
            :titulo="foto.titulo"
          />
          <router-link :to="{ name: 'altera', params: { id: foto._id } }">
            <meu-botao tipo="button" rotulo="ALTERAR"></meu-botao>
          </router-link>
          <meu-botao
            tipo="button"
            rotulo="REMOVER"
            @botaoAtivado="remove(foto)"
            :confirmacao="true"
            estilo="perigo"
          />
        </meu-painel>
      </li>
    </ul>
  </div>
</template>

<script>
import Painel from "../shared/painel/Painel.vue";
import ImagemResponsiva from "../shared/imagem-responsiva/ImagemResponsiva.vue";
import Botao from "../shared/botao/Botao.vue";
import transform from "../../directives/Transform";
import FotoService from '../../domain/foto/FotoService';

export default {
  components: {
    "meu-painel": Painel,
    "imagem-responsiva": ImagemResponsiva,
    "meu-botao": Botao,
  },

  directives: {
    "meu-transform": transform,
  },

  data() {
    return {
      titulo: "Alurapic",
      fotos: [],
      filtro: "",
      mensagem: "",
    };
  },
  computed: {
    fotosComFiltro() {
      if (this.filtro) {
        let exp = new RegExp(this.filtro.trim(), "i");
        return this.fotos.filter((foto) => exp.test(foto.titulo));
      } else {
        return this.fotos;
      }
    },
  },
  methods: {
    remove(foto) {
      this.service.apaga(foto._id)
      .then(
        () => {
          this.service.lista().then(fotos => this.fotos = fotos, err => this.mensagem = err.message)
          this.mensagem = "Foto removida com sucesso";
        },
        (err) => {
          console.log(err);
          this.mensagem = "Não foi possível remover a foto. Tente novamente mais tarde";
        });
    },
  },
  created() {
   this.service = new FotoService(this.$resource)
   this.service.lista().then(fotos => this.fotos = fotos, err => this.mensagem = err.message)}
  }
</script>

<style>
.h1 {
  font-size: 16px;
}

h1 {
  text-align: center;
  border: 1px solid black;
  font-family: math;
  color: white;
  font-size: 50px;
  text-transform: uppercase;
  margin-right: 202px;
  margin-left: 159px;
  text-shadow: -1px -1px 0px #000000, -1px 1px 0px #000000, 1px -1px 0px #000000,
    1px 0px 0px #000000;
}
p {
  text-align: center;
  font-family: math;
  font-size: 19px;
  font-weight: bolder;
}

input,
textarea {
  display: block;
  display: block;
  width: 100%;
  border-radius: 4px;
  color: black;
  font-size: 15px;
  font-family: math;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 3px solid black;
  background: #ddd9ce;
}

.lista-fotos .lista-fotos-item {
  display: inline;
}

.lista-fotos {
  list-style: none;
}
</style>
