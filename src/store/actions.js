import axios from "axios";

const actions = {
  addProductToCart({ commit }, product) {
    commit('addProductToCart', product)
  },

  exchangeDollar({ commit }, price) {
    commit('exchangeDollar', price)
  },

  getShopData({ commit }) {
    const getDataJSON = new Promise((resolve, reject) => {
      axios.get("./data/data.json").then(({ data }) => {
        resolve(data.Value.Goods)
      }).catch(error => {
        reject(error)
      });
    });

    const getNamesJSON = new Promise((resolve, reject) => {
      axios.get("./data/names.json").then(({ data }) => {
        resolve(data)
      }).catch(error => {
        reject(error)
      });
    });

    Promise.all([getDataJSON, getNamesJSON])
      .then(values => {
        commit("setDataJSON", values[0]);
        commit("setNamesJSON", values[1]);
      })
      .catch(error => {
        console.log(error);
      });
  }
}

export default actions