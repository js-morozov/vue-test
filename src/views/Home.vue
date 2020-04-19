<template>
  <div>
    <ul class="nav justify-content-end">
      <li class="nav-item">
        <router-link :to="{name: 'cart'}" class="nav-link text-info">
          <i class="fas fa-shopping-cart"></i> Корзина
        </router-link>
      </li>
    </ul>
    <div v-for="(item, index) in shop" :key="index" class="mb-4">
      <h4 class="pb-2">{{ item.category }}</h4>
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Название</th>
            <th scope="col">Цена</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, i) in item.products" :key="i">
            <th scope="row">{{ ++i }}.</th>
            <td>
              {{ product.name }}
              <span class="badge badge-dark badge-pill">{{ product.total }}</span>
            </td>
            <td>{{ product.price }}</td>
            <td>
              <button
                type="button"
                class="btn btn-outline-success"
                @click="addToCart(product)"
              >Добавить</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      goods: [],
      names: null
    };
  },
  computed: {
    products() {
      if (!this.goods.length) return [];

      return this.goods.map(item => {
        let groupName = "";
        let productName = "";

        for (let groupID in this.names) {
          if (+item.G === +groupID) {
            groupName = this.names[groupID].G;

            for (let productId in this.names[groupID].B) {
              if (+item.T === +productId) {
                productName = this.names[groupID].B[productId].N;
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

    groups() {
      return this.products
        .map(group => {
          return group.groupName;
        })
        .filter((item, index, arr) => arr.indexOf(item) == index);
    },

    shop() {
      return this.groups.map(item => {
        return {
          category: item,
          products: this.products
            .filter(i => i.groupName === item)
            .map(i => {
              return {
                name: i.productName,
                total: i.total,
                price: i.price
              };
            })
        };
      });
    }
  },
  methods: {
    addToCart(item) {
      console.log(item);
    }
  },
  async mounted() {
    await axios.get("./data/data.json").then(({ data }) => {
      if (data.Success) {
        this.goods = data.Value.Goods;
      } else {
        console.error(data.Error);
      }
    });

    await axios.get("./data/names.json").then(({ data }) => {
      this.names = data;
    });
  }
};
</script>

<style>
.table tr td:nth-child(2) {
  width: 100%;
}
.form-control {
  width: 100px;
}
</style>
