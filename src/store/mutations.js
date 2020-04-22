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
  },

  setDataJSON(state, data) {
    state.dataJSON = data
  },

  setNamesJSON(state, names) {
    state.namesJSON = names
  }
}

export default mutations