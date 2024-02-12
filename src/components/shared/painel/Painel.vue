<template>
  <div class="painel">
    <h2 class="painel-titulo" @dblclick="visivel = !visivel">{{ titulo }}</h2>

    <transition name="painel-fade">
      <div class="painel-conteudo" v-show="visivel">
        <slot> </slot>
      </div>
    </transition>

    <br />
  </div>
</template>

<script>
export default {
  props: ["titulo"],
  data() {
    return {
      visivel: true,
    };
  },
};
</script>

<style scoped>
.painel {
  padding: 0 auto;
  border: solid 2px grey;
  display: inline-block;
  margin: 10px;
  box-shadow: 10px 14px 40px;
  width: 200px;
  height: 100%;
  vertical-align: top;
  text-align: center;
}

* {
  box-shadow: 10px 14px 40px;
}

.painel-fade-enter,
.painel-fade-leave-active {
  opacity: 0;
}

.painel-fade-enter-active,
.painel-fade-leave-active {
  transition: opacity 0.4s;
}
.painel-conteudo {
  overflow: hidden;
}
</style>
