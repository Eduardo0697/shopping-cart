import Vuex from "vuex"
import Vue from "vue"
import shop from "../api/shop";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { // Equivalent to data
    products: [],
    // {id, quantity}
    cart: []
  },

  getters: { // Computed properties
    // Perfect for filter or calculate something in runtime
    // Getter track dependencies and change when a dependency change
    availableProducts(state, getters){ // getters are all the existing getters
      return state.products.filter((product => product.inventory > 0))
    }
  },

  actions: { // Methods
    // Actions could be complex but never change the state
    fetchProducts ({commit}){  // The context object exposes the same set of methods and properties as the store object
      // make the call to the api
      // We do not change the state here
      // If we want to update the state after the api call, we should call the setProducts mutation
      // context.state
      // context.mutation

      return new Promise((resolve, reject) => {
        shop.getProducts( products => {
          commit('setProducts', products)
          resolve()
        })
      });

    },
    // Actions are also responsible for the logic of when a mutation should be fired
    // e. g, if a user add an item to the cart we will call an action
    // addToCart(context, product){
    //   if(product.inventory > 0){
    //     context.commit('pushProductToCart', product)
    //   }else{
    //     // Show out of stock message
    //   }
    // }
    addProductToCart(context, product){
      if(product.inventory > 0){
        const cartItem = context.state.cart.find(item => item.id === product.id)
        if(!cartItem){
          // pushProductToCart
          context.commit('pushProductToCart', product.id)
        }else{
          // incrementItemQuantity
          context.commit('incrementItemQuantity', cartItem)
        }
      context.commit('decrementProductInventory', product)
      }
    }

  },

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
    }
  },

});

