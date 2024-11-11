<template>
    <div class="container" style="margin-top: 130px;">
        <div class="row">
          <div class="d-flex justify-content-between">
            <div class="col-12">
              <h2 class="mb-0 fs-4 text-black">All Items</h2>
            </div>
        </div>

          <!-- Content -->
          <div class="popular__list row d-flex">
                <div class="col-12 col-sm-2" style="padding-top: 12px; padding-bottom: 12px" v-for="(product, index) in products" :key="index">
                    <div class="card mb-5" style="height: 300px;">
                        <router-link :to="`/product/${product.id}`">
                        <img
                        :src="product.image"
                        class="card-img-top"
                        alt="Product"
                        height="160"
                        width="150"
                        style="object-fit: cover"
                        />
                        <div class="card-body" style="color: #0a0a0a">
                            <p class="mb-0 fw-bold">Rp. {{ formatCurrency(product.price) }}</p>
                        <div class="h-50">
                            <h4 class="mb-0" style="font-size: 15px;">{{ product.name }}</h4>
                        </div>
                        <div class="mt-5">
                          <p class="text-black justify-content-between"> {{ product.size }} / {{ product.color }} <span><i class="fa-regular fa-heart ms-2"></i></span> 12</p>
                        </div>
                        </div>
                    </router-link>
                    </div>
                </div>
            </div>
          </div>
    </div>
</template>

<script setup>;
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const products = ref();

onMounted(async () => {
    await store.dispatch("product/getProductData");
    products.value = store.state.product.products
})

function formatCurrency(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
</script>
