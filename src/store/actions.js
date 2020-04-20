const actions = {
  addProductToCart({ commit }, product) {
    commit('addProductToCart', product)
  },

  exchangeDollar({ commit }, price) {
    commit('exchangeDollar', price)
  }
}

export default actions
