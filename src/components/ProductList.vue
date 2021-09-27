<template>
  <div>
    <h1>Product List</h1>
    <ul>
      <li v-for="product in products">{{ product.title }} - {{ product.price }}</li>
    </ul>
  </div>

</template>

<script>
  import shop from "../api/shop.js"
  import store from "../store/index.js"
  export default {
    computed: {
      products () {
        return store.state.products
      }
    },
    created() {
      shop.getProducts( products => {
        // store.state.products = products // We should never update the state like this without commit a mutation
        // Commit a mutation
        store.commit('setProducts', products)
      })
    }

  }
</script>

<style scoped>

</style>
