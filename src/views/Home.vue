<template>
  <div>
    <ul class="nav justify-content-end">
      <li class="nav-item">
        <router-link :to="{name: 'cart'}" class="nav-link text-info">
          <i class="fas fa-shopping-cart"></i> Корзина
        </router-link>
      </li>
    </ul>
    <div class="row">
      <div class="col-3">
        <div class="input-group mt-3 mb-5">
          <div class="input-group-prepend">
            <span class="input-group-text">$</span>
          </div>
          <input type="number" class="form-control" v-model="exchange" />
        </div>
      </div>
    </div>
    <div v-for="(item, index) in shop" :key="index" class="mb-4">
      <h4 class="pb-2">{{ item.category }}</h4>
      <custom-table :products="item.products" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
import CustomTable from "@/components/CustomTable";

export default {
  components: {
    CustomTable
  },
  name: "App",
  data() {
    return {
      goods: [],
      names: null
    };
  },
  computed: {
    ...mapGetters(["cart"]),

    exchange: {
      get() {
        return this.$store.getters["exchange"];
      },
      set(newValue) {
        this.exchangeDollar(newValue);
      }
    },

    // Список продуктов из файлов data.json и names.json
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

    // Список уникальный групп / категорий
    groups() {
      return this.products
        .map(group => {
          return group.groupName;
        })
        .filter((item, index, arr) => arr.indexOf(item) == index);
    },

    // Сформированные товары для отображения
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
                price: Math.round(i.price * this.exchange * 100) / 100,
                productCategory: item
              };
            })
        };
      });
    }
  },
  methods: {
    ...mapActions(["exchangeDollar"])
  },
  mounted() {
    axios.get("./data/data.json").then(({ data }) => {
      if (data.Success) {
        this.goods = data.Value.Goods;
      } else {
        console.error(data.Error);
      }
    });

    axios.get("./data/names.json").then(({ data }) => {
      this.names = data;
    });
  }
};
</script>