<template>
  <div>
    <ul class="nav justify-content-end">
      <li class="nav-item">
        <router-link :to="{name: 'home'}" class="nav-link text-info">
          <i class="fas fa-store-alt"></i> Магазин
        </router-link>
      </li>
    </ul>
    <h4 class="pb-2">Корзина</h4>
    <div v-if="cart.length">
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Наименование</th>
            <th scope="col">Количество</th>
            <th scope="col" class="nowrap">Цена / шт.</th>
            <th scope="col" class="nowrap">Цена</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in cart" :key="index">
            <th scope="row">{{ ++index }}.</th>
            <td>
              {{ item.name }}
              <br />
              <span class="badge badge-info">{{ item.productCategory }}</span>
            </td>
            <td>
              <div class="form-group">
                <input
                  type="number"
                  min="1"
                  :max="item.total"
                  class="form-control"
                  v-model.number="item.quantity"
                />
                <span class="mx-2">шт.</span>
              </div>
              <div
                class="alert alert-danger nowrap"
                v-if="item.quantity >= item.total"
                role="alert"
              >Количество ограничено</div>
            </td>
            <td>
              <div class="nowrap pt-2">{{ item.price }}</div>
            </td>
            <td>
              <div class="nowrap pt-2">{{ Math.round((item.price * item.quantity) * 100) / 100 }}</div>
            </td>
            <td>
              <i class="fas fa-trash delete-icon" @click="deleteCartItem(--index)"></i>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="alert alert-info text-right" role="alert">
        Общая стоимость:
        <span class="price text-dark">{{ Math.round(total * 100) / 100 }}</span>
        руб.
      </div>
    </div>
    <div class="alert alert-warning" role="alert" v-else>В корзине нет товаров</div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Cart",
  computed: {
    ...mapGetters(["cart"]),

    // Подсчет суммы товаров в корзине
    total() {
      return this.cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);
    }
  },
  methods: {
    ...mapMutations(["deleteCartItem"])
  }
};
</script>

<style scoped>
.table tr td:nth-child(2) {
  min-width: 50%;
}
.form-group {
  display: flex;
  align-items: center;
  width: 100px;
}
.nowrap {
  white-space: nowrap;
}
.price {
  font-size: 24px;
  font-weight: bold;
  padding-left: 10px;
}
.delete-icon {
  cursor: pointer;
  padding-top: 12px;
  transition: all ease-in 0.2s;
}
.delete-icon:hover {
  opacity: 0.5;
}
</style>
