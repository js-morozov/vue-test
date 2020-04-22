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
    ...mapGetters(["cart", "shop"]),

    exchange: {
      get() {
        return this.$store.getters["exchange"];
      },
      set(newValue) {
        this.exchangeDollar(newValue);
      }
    }
  },
  methods: {
    ...mapActions(["getShopData", "exchangeDollar"])
  },
  async created() {
    await this.getShopData();
  }
};
</script>