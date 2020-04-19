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
              <span class="badge badge-info">{{ item.category }}</span>
            </td>
            <td>
              <div class="form-group">
                <input type="number" class="form-control" v-model="item.quantity" />
                <span class="ml-2">шт.</span>
              </div>
            </td>
            <td>
              <div class="nowrap pt-2">{{ item.price }}$</div>
            </td>
            <td>
              <div class="nowrap pt-2">{{ item.price * item.quantity }}$</div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="alert alert-info text-right" role="alert">
        Общая стоимость:
        <span class="price text-dark">{{total}} $</span>
      </div>
    </div>
    <div class="alert alert-warning" role="alert" v-else>В корзине нет товаров</div>
  </div>
</template>

<script>
export default {
  name: "Cart",
  data() {
    return {
      cart: [
        {
          name: "JavaScript. Подробное руководство. Дэвид Флэнаган.",
          total: 31,
          price: 18,
          quantity: 1,
          category: "Книги"
        },
        {
          name: "Постный фаршированный перец",
          total: 76,
          price: 1.52,
          quantity: 1,
          category: "Еда"
        }
      ]
    };
  },
  computed: {
    total() {
      let sum = 0;
      this.cart.forEach(item => {
        sum += item.price * item.quantity;
      });
      return sum;
    }
  }
};
</script>

<style>
.table tr td:nth-child(2) {
  width: 100%;
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
</style>
