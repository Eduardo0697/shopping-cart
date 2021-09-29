<template>
  <div>
    <h1>Product List</h1>
    <img v-if="loading" src="https://i.imgur.com/JfPpwOA.gif">
    <ul v-else>
      <li v-for="product in products">
        {{ product.title }} - {{ product.price | currency  }} - {{ product.inventory }}
        <button
          :disabled="!productsIsInStock(product)"
          @click="addProductToCart(product)">Add to cart</button>
      </li>
    </ul>
  </div>

</template>

<script>
  // import shop from "../api/shop.js"
  // import store from "../store/index.js"
  import { mapState, mapGetters, mapActions } from "vuex"
  export default {
    data(){
      return{
        loading: false,
        // productIndex: 1
      }
    },
    // computed: mapState({
    //   // allProducts: 'products',
    //   // We can also use functions as values of a string
    //   products: state => state.products,
    //   // firstProduct: state => state.products[0],
    //   // specificProduct: (state) => {
    //   //   return state.products[this.productIndex]
    //   // }
    // }),
    computed: {
      ...mapState({
        products: state => state.products
      }),
      ...mapGetters({
        productsIsInStock: 'productsIsInStock'
      }),
    },
    methods:{
      ...mapActions({
        fetchProducts: 'fetchProducts',
        addProductToCart: 'addProductToCart'
      }),
      // addProductToCart(product){
      //   this.$store.dispatch('addProductToCart', product)
      // }
    },
    created() {
      // shop.getProducts( products => {
      //   // store.state.products = products // We should never update the state like this without commit a mutation
      //   // Commit a mutation
      //   store.commit('setProducts', products)
      // })

      // To trigger an action we use dispatch, which is similiar to commit but for calling actions
      this.loading = true;
      const context = this;
      setTimeout( () => {
        // context.$store.dispatch('fetchProducts') // Because we set the action as a promise we can use the promise here
        //   .then(() => this.loading = false)
        context.fetchProducts()
          .then(() => this.loading = false)
      }, 500)

    }

  }
</script>

<style scoped>

</style>
