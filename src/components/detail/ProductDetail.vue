<template>
    <div>
        <product-description :productId="selectedProductId"></product-description>
    </div>
    <div>
        <other-product :products="productListAll" v-if="productListStatus"></other-product>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import ProductDescription from './ProductDescription.vue';
import OtherProduct from '../product/OtherProduct.vue';

const store = useStore()
const route = useRoute()
const selectedProductId = ref(route.params.id);
const productListStatus = ref(false);
const productListAll = ref();

onMounted (async () => {
    await store.dispatch (
        "product/getProductDetail", route.params.id
    )
})

onMounted(async () => {
  try {
    await store.dispatch("product/getProductData");
    productListStatus.value = true;
    productListAll.value = store.state.product.products
  } catch (error) {
    console.log(error);
  }
})

</script>