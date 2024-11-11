<template>
  <div class="container" style="margin-top: 100px; margin-bottom: 200px">
    <div class="row">
      <!-- Sidebar Menu -->
      <div class="col-4 mt-4">
        <h2 class="mb-4 fw-bold">Settings</h2>
        <ul type="none">
          <router-link to="/personal-info" class="text-black"><li class="mb-4">Profile Details</li></router-link>
          <router-link to="/change-password" class="text-black"><li class="mb-4">Change Password</li></router-link>
          <router-link to="/transaction" class="text-black"><li class="mb-4 fw-bold">Transaction History</li></router-link>
          <router-link to="/my-products" class="text-black"><li class="mb-4">My Products</li></router-link>
        </ul>
      </div>

      <!-- Transaction History -->
      <div class="col-8">
        <h3 class="mb-4">My Order</h3>
        <div v-if="transactions.length > 0">
          <div v-for="transaction in transactions" :key="transaction.id" class="card p-3 mb-4">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <p class="text-muted mb-1">{{ formatDate(transaction.createdAt) }}</p>
                <h6>ORD-{{ transaction.id }}</h6>
              </div>
              <p class="badge bg-success text-white">Done</p>
              <p class="fw-bold">Total Price: Rp {{ formatCurrency(transaction.total) }}</p>
            </div>
            <hr>
            <div v-for="product in transaction.products" :key="product.name" class="d-flex justify-content-between">
              <div class="d-flex">
                <img :src="product.image" alt="product.name" width="50" height="50" class="me-3">
                <div>
                  <p class="fw-bold mb-0">{{ product.name }}</p>
                  <p class="text-muted">{{ product.qty }}x - Rp {{ formatCurrency(product.price) }}</p>
                </div>
              </div>
              <p class="fw-bold">Rp {{ formatCurrency(product.total) }}</p>
            </div>
            <button class="btn btn-primary mt-3">Buy Again</button>
          </div>
        </div>
        <div v-else class="empty-transaction">
            <!-- Cart Icon -->
            <img src="/src/assets/images/bag.png" alt="Empty Icon" class="empty-transaction-icon">
            <h5 class="fw-bold">No Order yet</h5>
            
            <!-- Message -->
            <p class="empty-transaction-message">When you buy an item, your order about it will appear here</p>
            
            <!-- Button -->
            <button class="shop-now-button" @click="goToProducts">Shop Now</button>
        </div>
      </div>
    </div>
  </div>
  <web-footer></web-footer>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import WebFooter from '../footer/WebFooter.vue';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

onMounted(async () => {
  await store.dispatch('transaction/getTransactionData');
});

const transactions = computed(() => store.state.transaction.transaction);

function formatCurrency(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function formatDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

const goToProducts = async () => {
  router.push("/all-product")
}

</script>

<style scoped>
.card {
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.empty-transaction {
    text-align: center;
    color: #333;
}

.empty-transaction-icon {
    width: 80px;
    height: auto;
    margin-bottom: 20px;
}

.empty-transaction-message {
    font-size: 16px;
    color: #555;
    margin-bottom: 20px;
}

.shop-now-button {
    background-color: #009499;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    width: 300px;
}

.shop-now-button:hover {
    background-color: #0d6b6e;
}

</style>
