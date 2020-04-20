const mutations = {
  addProductToCart(state, product) {
    state.cart.push({
      ...product,
      quantity: 1
    })
  },

  deleteCartItem(state, index) {
    state.cart.splice(index, 1);
  },

  exchangeDollar(state, price) {
    state.exchange = price
  }
}

export default mutations