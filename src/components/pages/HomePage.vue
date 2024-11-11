<template>
    <div class="bg-image align-items-center d-flex mb-5">
      <div class="card" style="width: 18rem; margin-left: 120px;">
        <div class="card-body">
          <h5 class="card-title mb-4 fs-5 fw-bold">Ready to declutter you closet?</h5>
          <router-link to="/all-product" class="btn btn-primary">Shop Now</router-link>
        </div>
      </div>
    </div>
    <product-list :products="productList" v-if="productListStatus"></product-list>
    <brand-list></brand-list>
    <new-product-list :products="productList" v-if="productListStatus"></new-product-list>
</template>

<script setup>
import ProductList from '../product/ProductList.vue';
import BrandList from '../brand/BrandList.vue';
import NewProductList from '../product/NewProductList.vue';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const productListStatus = ref(false);
const productList = ref();

onMounted(async () => {
  try {
    await store.dispatch("product/getProductData");
    productListStatus.value = true;
    productList.value = store.state.product.products
  } catch (error) {
    console.log(error);
  }
})
</script>