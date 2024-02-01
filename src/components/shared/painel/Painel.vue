<template>
  <div class="painel">
    <h2 class="painel-titulo" @dblclick="visivel = !visivel">{{ titulo }}</h2>

    <transition name="painel-fade">
      <div class="painel-conteudo" v-show="visivel">
        <slot> </slot>
      </div>
    </transition>
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
 border: solid 2px grey;
  box-shadow: 5px 5px 10px grey;
  width: 473px;
  height: 100%;
  padding: 25px;
  margin-left: 159px;
  margin-top: 28px;


}
* {
  box-shadow: 5px 5px 5px;
}
.painel-fade-enter,
.painel-fade-leave-active {
  opacity: 0;
}
.painel-fade-enter-active,
.painel-fade-leave-active {
  transition: opacity 0.4s;
}
</style>
