<template>
  <img :class="[this.grande ? 'imagem-responsiva-grande' : 'imagem-responsiva']" :src="url" :alt="titulo" />
</template>
<script>
export default {
  props: ["url", "titulo", "grande"],
};
</script>
<style scoped>

.imagem-responsiva-grande {
  width: 100%;
  object-fit: cover;
  object-position: top;
}

.imagem-responsiva {
  width: 100%;
  height: 153px;
  object-fit: cover;
  object-position: top;
}
</style>
