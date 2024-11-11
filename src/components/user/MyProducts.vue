<template>
    <div class="container" style="margin-top: 100px; margin-bottom: 200px">
      <div class="row">
        <div class="col-4 mt-4">
          <h2 class="mb-4 fw-bold">Settings</h2>
          <ul type="none"> 
              <router-link to="/personal-info" class="text-black"><li class="mb-4">Profile Details</li></router-link>
              <router-link to="/change-password" class="text-black"><li class="mb-4">Change Password</li></router-link>
              <router-link to="/transaction" class="text-black"><li class="mb-4">Transaction History</li></router-link>
              <router-link to="/my-products" class="text-black"><li class="mb-4 fw-bold">My Products</li></router-link>
          </ul>
        </div>
        <div class="col-8 mb-5">
            <div class="card mt-4 mb-5" style="width: 50rem; margin-left: -70px;">
            <ul class="list-group">
                <li class="list-group-item">
                    <div class="d-flex flex-sm-row flex-column justify-content-between align-items-sm-center">
                    <div class="mb-3 mb-sm-0">
                        <p class="my-0 fs-5 fw-semibold">My Products</p>
                    </div>
                    <div>
                        <base-button class="btn btn-primary" style="width: 150px;" @click="gotoAddProduct">
                        <img src="/src//assets/images/plus.png" alt="plus" height="22" width="22">Add Product
                        </base-button>
                    </div>
                    </div>
                    <hr>
                    <p class="mt-2 mb-4 fs-5 fw-semibold">Products</p>
                    <div class="row">
                    <user-product-card v-for="product in products" :key="product.id" :product="product" :buttonName="['Delete', 'Edit']" @btnRemove="deleteProduct(product.id)" @btnUpdate="updateProduct(product.id)">
                        <p>{{ new Date(product.createdAt).toDateString() }}</p>
                    </user-product-card>
                    </div>
                </li>
            </ul>
            </div>
        </div>
    </div>
    </div>
    <web-footer></web-footer>
</template>

<script setup>
import WebFooter from '../footer/WebFooter.vue';
import BaseButton from '../ui/BaseButton.vue';
import UserProductCard from './UserProductCard.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const products = computed(() => {
  const allProduct = store.state.product.products;
  const userId = store.state.auth.userLogin.userId;
  return allProduct.filter((product) => product.userId === userId)
})

const deleteProduct = async (id) => {
  await store.dispatch("product/deleteProduct", id);
}

const updateProduct = async (id) => {
  await store.dispatch("product/updateProduct", id);
  router.push(`product/edit/${id}`);
}

const gotoAddProduct = () => {
  router.push({ name: "newProductPage"})
}

</script>