<template>
  <div>
    <h1>Shopping Cart</h1>
    <ul>
      <li v-for="product in products">
        {{ product.title }} - {{ product.price | currency }} - {{ product.quantity }}
      </li>
    </ul>
    <p>Total: {{ total | currency }}</p>
<!--    If the checkout fails, we could return a promise from the checkout action in order to show a modal-->
    <button @click="checkout">Checkout</button>
    <p v-if="checkoutStatus">{{ checkoutStatus }}</p>
  </div>

</template>

<script>
  import { mapState, mapGetters, mapActions } from "vuex"
  export default {
    computed: {
      ...mapGetters({
        products: 'cartProducts',
        total: 'cartTotal'
      }),
      ...mapState({
        checkoutStatus: 'checkoutStatus'
      })
    },
    // computed: {
    //   products(){
    //     return this.$store.getters.cartProducts
    //   },
    //   total(){
    //     return this.$store.getters.cartTotal
    //   }
    // }
    methods:{
      ...mapActions({
        checkout: 'checkout'
      })
    }

  }
</script>

<style scoped>

</style>
