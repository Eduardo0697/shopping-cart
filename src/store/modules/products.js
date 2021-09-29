import shop from "../../api/shop";

export default {
  state: {
    items: [],
  },
  getters: {
    availableProducts(state, getters){ // getters are all the existing getters
      return state.items.filter((product => product.inventory > 0))
    },
    productsIsInStock() {
      // We are returning a function to pass parameters to the getters, since getter dont accept parameters by default
      return (product) => {
        return product.inventory > 0
      }
    }
  },
  mutations: {
    // Simple and responsible to change only one piece of state
    setProducts(state, products) { // Parameters state and payload, in this case the payload is the products
      // Update products
      state.items = products
    },
    decrementProductInventory(state, product){
      product.inventory--
    },
  },
  actions:{
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
  }
}
