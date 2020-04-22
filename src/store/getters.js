const getters = {
  cart: state => state.cart,
  exchange: state => state.exchange,

  // Список продуктов из файлов data.json и names.json
  products: state => {
    if (!state.dataJSON.length) return [];

    return state.dataJSON.map(item => {
      let groupName = "";
      let productName = "";

      for (let groupID in state.namesJSON) {
        if (+item.G === +groupID) {
          groupName = state.namesJSON[groupID].G;

          for (let productId in state.namesJSON[groupID].B) {
            if (+item.T === +productId) {
              productName = state.namesJSON[groupID].B[productId].N;
            }
          }
        }
      }

      return {
        groupName,
        total: item.P,
        price: item.C,
        productName
      };
    });
  },

  // Список уникальный групп / категорий
  groups: (state, getters) => {
    return getters.products
      .map(group => {
        return group.groupName;
      })
      .filter((item, index, arr) => arr.indexOf(item) == index);
  },

  // Сформированные товары для отображения
  shop: (state, getters) => {
    return getters.groups.map(item => {
      return {
        category: item,
        products: getters.products
          .filter(i => i.groupName === item)
          .map(i => {
            return {
              name: i.productName,
              total: i.total,
              price: Math.round(i.price * state.exchange * 100) / 100,
              productCategory: item
            };
          })
      };
    });
  }

};

export default getters;