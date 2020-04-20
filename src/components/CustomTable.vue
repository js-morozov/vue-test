<template>
  <div>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Название</th>
          <th scope="col" class="nowrap">Цена, руб.</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, i) in products" :key="i">
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
              @click="addToCart($event, product)"
            >Добавить</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "CustomTable",
  props: {
    products: {
      type: Object
    }
  },
  methods: {
    ...mapActions(["addProductToCart"]),

    addToCart($event, product) {
      // Имитация добавления товара в корзину
      $event.target.className = "btn btn-success";
      $event.target.innerText = "Добавлено";
      $event.target.disabled = true;

      this.addProductToCart(product);
    }
  }
};
</script>

<style scoped>
.btn {
  width: 110px;
}
.table tr td:nth-child(2) {
  width: 100%;
}
.form-control {
  width: 100px;
}
.nowrap {
  white-space: nowrap;
}
</style>