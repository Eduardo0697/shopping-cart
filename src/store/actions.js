import shop from "../api/shop"

export default { // Methods
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
  addProductToCart({ state, getters, commit }, product){
    if(getters.productsIsInStock(product)){
      const cartItem = state.cart.find(item => item.id === product.id)
      if(!cartItem){
        // pushProductToCart
        commit('pushProductToCart', product.id)
      }else{
        // incrementItemQuantity
        commit('incrementItemQuantity', cartItem)
      }
      commit('decrementProductInventory', product)
    }
  },
  checkout({state, commit}){
    shop.buyProducts(
      state.cart,
      () => {
        commit('emptyCart')
        commit('setCheckoutStatus', 'success')
      },
      () => {
        commit('setCheckoutStatus', 'fail')
      }
    )
  }

}
