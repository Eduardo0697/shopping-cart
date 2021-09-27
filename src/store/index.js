import Vuex from "vuex"
import Vue from "vue"

Vue.use(Vuex);

export default new Vuex.Store({
  state: { // Equivalent to data
    products: []
  },

  getters: { // Computed properties
    productsCount () {
      // Count the length of the products array
    }
  },

  actions: { // Methods
    // Actions could be complex but never change the state
    fetchProducts (){
      // make the call to the api
      // We do not change the state here
      // If we want to update the state after the api call, we should call the setProducts mutation

    }
  },

  mutations: { // Are responsible of setting and updating the state
    // Simple and responsible to change only one piece of state
    setProducts(state, products) { // Parameters state and payload, in this case the payload is the products
      // Update products
      state.products = products
    }
  }

});

