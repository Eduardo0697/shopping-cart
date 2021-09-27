import Vuex from "vuex"
import Vue from "vue"

Vue.use(Vuex);

new Vuex.Store({
  state: { // Equivalent to data
    products: []
  },

  getters: { // Computed properties
    productsCount () {
      // Count the length of the products array
    }
  },

  actions: { // Methods
    fetchProducts (){
      // make the call to the api
    }
  },

  mutations: { // Are responsible of setting and updating the state
    setProducts() {
      // Update products
    }
  }

});

