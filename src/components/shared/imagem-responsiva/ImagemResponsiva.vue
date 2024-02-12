<template>
  <img class="imagem-responsiva" :src="url" :alt="titulo" />
</template>
<script>
export default {
  props: ["url", "titulo"],
};
</script>
<style scoped>
.imagem-responsiva {
  width: 100%;
  height: 153px;
  object-fit: cover;
  object-position: top;
}
</style>
