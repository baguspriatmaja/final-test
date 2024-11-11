<template>
    <div class="container" style="margin-top: 100px;">
    <div class="row">
        <!-- Cart Items -->
        <div class="col-6 col-sm-8">
            <div class="d-flex justify-content-between">
                <h3 class="ms-5">Cart</h3>
                <p class="mt-1 p-1 fw-bold" style="border: 1px solid #eeeeee; border-radius: 5px; height: 30px;">{{ cartProducts.length }} Items</p>
            </div>
            <hr class="ms-5">
            <p class="ms-5 ps-2" style="background-color: #eeeeee;"><span><img src="/src/assets/images/location.png" alt="location" width="30" height="30"></span>Shipping to <span class="fw-bold">Kuta, Badung</span></p>

            <div v-if="cartProducts.length > 0">
                <div v-for="product in cartProducts" :key="product.id" class="d-flex align-items-center justify-content-between mb-4 ms-5 border">
                    <div class="d-flex align-items-center">
                        <img :src="product.image" alt="product.name" width="150" height="200" class="me-3">
                        <div class="mt-3 p-2" id="contentCart">
                            <p class="fw-bold">{{ product.name }}</p>
                            <p class="text-black justify-content-between"> {{ product.size }} / {{ product.color }}</p>
                            <p class="text-black mt-4 fw-bold" id="itemPrice">Rp. {{ formatCurrency(product.price) }}</p>
                            <button @click="removeFromCart(product)" class="btn btn-primary text-white" style="width: 100px;">Remove</button>
                        </div>
                    </div>
                    <div class="quantity-controls d-flex align-items-center pe-3">
                        <button @click="decreaseQuantity(product)" class="btn btn-outline-secondary btn-sm">-</button>
                        <input type="text" v-model="product.qty" class="form-control text-center mx-2" style="width: 50px;" readonly />
                        <button @click="increaseQuantity(product)" class="btn btn-outline-secondary btn-sm">+</button>
                    </div> 
                </div>
            </div>
            <div v-else class="empty-cart">
                <!-- Cart Icon -->
                <img src="/src/assets/images/empty.png" alt="Empty Cart Icon" class="empty-cart-icon">
                <h5 class="fw-bold">Your Cart Still Empty</h5>
                
                <!-- Message -->
                <p class="empty-cart-message">Find your favorite items and add to cart before check out.</p>
                
                <!-- Button -->
                <button class="find-products-button" @click="goToProducts">Find Products</button>
            </div>
        </div>

        <!-- Order Summary -->
        <div class="col-6 col-sm-4">
            <div class="card p-4" style="position: sticky; top: 100px;">
                <div class="d-flex justify-content-between">
                    <h5 class="card-title">Order Summary</h5>
                    <h4 class="text-end fs-5">Rp {{ totalPrice }}</h4>
                </div>
                <div class="d-flex justify-content-between">
                    <p>{{ cartProducts.length }} items</p>
                    <p class="text-muted">Not include shipping fee</p>
                </div>
                <hr>
                <router-link to="/order"><button class="btn btn-primary w-100 mt-3">Checkout({{ cartProducts.length }})</button></router-link>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
import { onMounted,computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const product = ref();
const router = useRouter();

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

const increaseQuantity = (product) => {
    store.dispatch('cart/increaseQuantity', {
        productId: product.id,
        currentQty: product.qty
    });
};

const decreaseQuantity = (product) => {
    store.dispatch('cart/decreaseQuantity', {
        productId: product.id,
        currentQty: product.qty
    });
};

const removeFromCart = (product) => {
    store.dispatch('cart/removeFromCart', product.id);
};

function formatCurrency(value) {
    if (value === undefined || value === null) return '0';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const goToProducts = async () => {
  router.push("/all-product")
}


</script>

<style scoped>
.empty-cart {
    text-align: center;
    color: #333;
}

.empty-cart-icon {
    width: 80px;
    height: auto;
    margin-bottom: 20px;
}

.empty-cart-message {
    font-size: 16px;
    color: #555;
    margin-bottom: 20px;
}

.find-products-button {
    background-color: #009499;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

.find-products-button:hover {
    background-color: #0d6b6e;
}

</style>

