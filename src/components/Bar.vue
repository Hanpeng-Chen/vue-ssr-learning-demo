<template>
  <div>
    <div>{{ $store.state.name }}</div>
  </div>
</template>

<script>
export default {
  asyncData (store) {
    console.log('server callback changeName')
    return store.dispatch("changeName");
  }
}
</script>

<style scoped>
div {
  background: #eee;
}
</style>