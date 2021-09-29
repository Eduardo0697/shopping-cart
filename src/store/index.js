import Vuex from "vuex"
import Vue from "vue"
import actions from "./actions";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { // Equivalent to data
    products: [],
    // {id, quantity}
    cart: [],
    checkoutStatus : null
  },

  getters: { // Computed properties
    // Perfect for filter or calculate something in runtime
    // Getter track dependencies and change when a dependency change
    availableProducts(state, getters){ // getters are all the existing getters
      return state.products.filter((product => product.inventory > 0))
    },
    cartProducts(state){
      return state.cart.map(cartItem => {
        const product = state.products.find(product => product.id === cartItem.id)
        return{
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity
        }
      })
    },
    cartTotal(state, getters){
      // let total = 0
      // getters.cartProducts.forEach(product => {
      //   total += product.price * product.quantity
      // });
      // return total
      return getters.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0)
    },
    productsIsInStock() {
      // We are returning a function to pass parameters to the getters, since getter dont accept parameters by default
      return (product) => {
        return product.inventory > 0
      }
    }

  },

  actions,

  mutations: { // Are responsible of setting and updating the state
    // Simple and responsible to change only one piece of state
    setProducts(state, products) { // Parameters state and payload, in this case the payload is the products
      // Update products
      state.products = products
    },

    pushProductToCart(state, productId){
      state.cart.push({
        id: productId,
        quantity: 1
      })
    },
    incrementItemQuantity(state, cartItem){
      cartItem.quantity++
    },
    decrementProductInventory(state, product){
      product.inventory--
    },
    setCheckoutStatus(state, status){
      state.checkoutStatus = status
    },
    emptyCart(state){
      state.cart = []
    }
  },

});

