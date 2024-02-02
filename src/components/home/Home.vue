<template>
  <div>
    <h1 class="centralizado">{{ titulo }}</h1>
    <input
      type="search"
      class="filtro"
      @input="filtro = $event.target.value"
      placeholder="Filtre por parte so título"
    />

    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComFiltro">
        <meu-painel :titulo="foto.titulo">
          <imagem-responsiva
            v-meu-transform:scale.animate="1.2"
            :url="foto.url"
            :titulo="foto.titulo"
          />
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
      alert("Remover a foto!" + foto.titulo);
    },
  },
  created() {
    this.$http
      .get("http://localhost:3000/v1/fotos")
      .then((res) => res.json())
      .then(
        (fotos) => (this.fotos = fotos),
        (err) => console.log(err)
      );
  },
};
</script>

<style>
.h1 {
  font-size: 16px;
}

h1,
h2.centralizado {
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

.filtro {
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
  background-color: #ddd9ce;
}

.lista-fotos .lista-fotos-item {
  display: inline;
}

.lista-fotos {
  list-style: none;
}
</style>
