<template>
  <div @click="alert">
    <div>foo</div>
    
    <!-- <div>{{$store.state.name}}</div>
    <button @click="$store.dispatch('changeName')">修改</button> -->
  </div>
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