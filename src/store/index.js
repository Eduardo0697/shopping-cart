import Vuex from "vuex"
import Vue from "vue"
import actions from "./actions";
import cart from "./modules/cart";
import products from "./modules/products";

Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    cart,
    products
  },
  state: { // Equivalent to data

  },

  getters: { // Computed properties
    // Perfect for filter or calculate something in runtime
    // Getter track dependencies and change when a dependency change

  },

  actions,

  mutations: { // Are responsible of setting and updating the state

  },

});

