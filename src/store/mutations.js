const mutations = {
  deleteCartItem(state, index) {
    console.log(index)
    state.cart.splice(index, 1);
  }
}

export default mutations