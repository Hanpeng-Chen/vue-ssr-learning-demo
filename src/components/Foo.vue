<template>
  <div @click="alert">foo</div>
</template>

<script>
export default {
  methods: {
    alert () {
      alert('foo')
    }
  }
}
</script>

<style scoped>
div {
  background: red;
  color: #FFF;
}
</style>