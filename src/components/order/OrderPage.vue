<template>
    <div class="container" style="margin-top: 100px; margin-bottom: 100px">
    <div class="row">
        <!-- Order Items -->
        <div class="col-6 col-sm-8 p-3 border mb-4" style="border-radius: 15px;">
            <div class="d-flex justify-content-between">
                <h3 class="ms-2 mb-3">Order</h3>
            </div>
            <div v-if="cartProducts.length > 0">
                <div v-for="product in cartProducts" :key="product.id" class="mb-4 ms-2">
                    <div class="d-flex align-items-center justify-content-between">
                        <img :src="product.image" alt="product.name" width="80" height="80">
                        <div style="margin-right: 450px;">
                            <p class="fw-bold mb-0">{{ product.name }}</p>
                            <p class="text-black"> {{ product.size }} / {{ product.color }}</p>
                            <p class="text-black fw-bold mb-0" id="itemPrice">Rp. {{ formatCurrency(product.price * product.qty) }}</p>
                        </div>
                        <p class="fw-bold">{{ product.qty }}x</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- Order Summary -->
        <div class="col-6 col-sm-4">
            <div class="card p-4" style="position: sticky; top: 100px;">
                <div class="d-flex justify-content-between">
                    <p class="card-title">Order Summary</p>
                </div>
                <div class="d-flex justify-content-between">
                    <p>Order</p>
                    <h4 class="text-end" style="font-size: 17px;">Rp {{ totalPrice }}</h4>
                </div>
                <div class="d-flex justify-content-between">
                    <p>Protection fee</p>
                    <h4 class="text-end" style="font-size: 17px;">Rp {{ protectionFee }}</h4>
                </div>
                <div class="d-flex justify-content-between">
                    <p>Shipping</p>
                    <h4 class="text-end" style="font-size: 17px;">Rp {{ shippingCost }}</h4>
                </div>
                <hr>
                <div class="d-flex justify-content-between">
                    <p class="fw-bold">Total to pay</p>
                    <h4 class="text-end fw-bold" style="font-size: 17px;">Rp {{ totalToPay }}</h4>
                </div>
                <button @click="addToTransaction" class="btn btn-primary w-100 mt-3">Order Now</button>
            </div>
        </div>

        <!-- Address -->
        <div class="col-6 col-sm-8 p-3 mb-4 border" style="border-radius: 15px;">
            <div class="d-flex justify-content-between">
                <p class="ms-2 mb-3 fw-bold">Address</p>
            </div>
            <div class="border ms-2 p-3" style="height: 80px;">
                <div class="d-flex">
                    <img src="/src/assets/images/loc.png"
                    alt="location" width="40" height="40">
                    <div>
                        <p class="ms-3 mb-0 fw-bold">PT. Timedoor Indonesia</p>
                        <p class="ms-3">Jl. Tukad Yeh Aya IX No.46, Renon, Denpasar Selatan, Kota Denpasar, Bali 80226</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Delivery Details -->
        <div class="col-6 col-sm-8 p-3 border mb-4" style="border-radius: 15px;">
            <div class="d-flex justify-content-between">
                <p class="ms-2 mb-3 fw-bold">Delivery Details</p>
            </div>
            <div class="border ms-2 p-3" style="height: 100px;">
                <div class="d-flex">
                    <img src="/src/assets/images/delivery.png"
                        alt="location" width="40" height="40">
                    <div>
                        <p class="ms-3 mb-0 fw-bold">Fedex Express Shipping</p>
                        <p class="ms-3 mb-0">Rp.{{ shippingCost }}</p>
                        <p class="ms-3" style="opacity: 70%; font-size: 13px;"><i class="fa-regular fa-clock"></i> Home delivery in 1-3 working days</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- Payment Method  -->
        <div class="col-6 col-sm-8 p-3 border mb-5" style="border-radius: 15px;">
            <div class="d-flex justify-content-between">
                <p class="ms-2 mb-3 fw-bold">Payment Method</p>
            </div>
            <div class="border ms-2 p-3" style="height: 100px;">
                <div class="d-flex">
                    <img src="/src/assets/images/visa.png"
                    alt="location" width="40" height="40">
                    <div>
                        <p class="ms-3 mb-0 fw-bold">0819283210323</p>
                        <div class="d-flex mb-0">
                            <p class="ms-3 mb-0">23/12</p>
                            <ul>
                                <li>123</li>
                            </ul>
                        </div>
                        <p class="ms-3" style="opacity: 70%; font-size: 13px; margin-top: -10px;"><i class="fa-regular fa-credit-card"></i> Jack Daniel Arya</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    <!-- Modal -->
    <div v-if="showModalOrder" class="modal-overlay">
            <div class="modal-content">
                <video id="banner-video" width="200" height="200" style="margin-left: 90px;" autoplay muted playsinline loop>
                <source src="/src/assets/images/payment.webm" type="video/webm">
                </video>
                <h1>Order placed successfully.</h1>
                <div class="text-center">
                    <p style="font-size: 17px;">Thankyou for do online shopping at Vintage.</p>
                    <p style="font-size: 17px;">You can track and see your order on transaction history menu.</p>
                </div>
                <router-link to="/"><button class="btn btn-outline-info" style="width: 350px">Continue Shopping</button></router-link>
                <router-link to="/transaction"><button class="btn btn-primary" style="width: 350px">Go to History Transaction</button></router-link>
            </div>
        </div>
</template>

<script setup>
import { onMounted,computed, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const product = ref();
const showModalOrder = ref(false);


onMounted(async () => {
    await store.dispatch("cart/getCartProducts");
    await store.dispatch("product/getProductData");
    product.value = store.state.product.products
})

const cartProducts = computed (() => {
    return store.state.cart.cartProducts;
})  

const totalPrice = computed(() => {
    const total = cartProducts.value.reduce((total, product) => {
        return total + (product.price * product.qty);
    }, 0);
    return formatCurrency(total);
});

const shippingCost = computed(() => {
    if (product.value && product.value.length > 0) {
        const shippingData = product.value.find((item) => item.shipping);
        return shippingData ? formatCurrency(shippingData.shipping) : "0";
    } else {
        return "0";
    }
});

const protectionFee = computed(() => {
    return formatCurrency(15000);
});

const totalToPay = computed(() => {
    const total = parseInt(totalPrice.value.replace(/\./g, "")) +
                  parseInt(shippingCost.value.replace(/\./g, "")) +
                  parseInt(protectionFee.value.replace(/\./g, ""));
    return formatCurrency(total);
});

function formatCurrency(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

async function addToTransaction() {
  const orderData = {
    products: cartProducts.value.map(product => ({
      name: product.name,
      price: product.price,
      qty: product.qty,
      total: product.price * product.qty,
      image : product.image
    })),
    total: parseInt(totalPrice.value.replace(/\./g, '')) + parseInt(shippingCost.value.replace(/\./g, '')) + parseInt(protectionFee.value.replace(/\./g, '')),
    createdAt: Date.now()
  };

  try {
    await store.dispatch('transaction/addNewTransaction', orderData);
    showModalOrder.value = true;
    console.log('Order successful:', showModalOrder.value);
  } catch (err) {
    console.error('Failed to place order:', err);
  }
}

</script>


<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  margin-top: 100px;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  width: 450px;
}

.modal-content h2 {
  margin-top: 1rem;
}

.modal-content p {
  color: #666;
  margin: 1rem 0;
}

</style>

