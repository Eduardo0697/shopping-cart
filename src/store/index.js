import Vuex from "vuex"
import Vue from "vue"

Vue.use(Vuex);

export default new Vuex.Store({
  state: { // Equivalent to data
    products: []
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

