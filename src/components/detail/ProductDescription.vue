<template>
    <div class="container">
    <div class="row align-items-center">
    <div class="col-sm-1"></div>
    <div class="col-sm-5 ms-5">
        <div id="carouselExample" class="carousel slide">
            <div class="carousel-inner">
                <div class="carousel-item active">
                <img :src="productDetail.image" class="d-block w-100" alt="product">
                </div>
                <div class="carousel-item">
                <img :src="productDetail.image" class="d-block w-100" alt="product">
                </div>
                <div class="carousel-item">
                <img :src="productDetail.image" class="d-block w-100" alt="product">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
    <div class="col ms-5">
        <div class="card" id="cardDetail" style="width: 23rem;">
        <div class="card-body">
            <h2 class="card-title">Rp. {{ productDetail.price }} <span><i class="fa fa-heart fs-3" style="margin-left: 100px;"></i></span></h2>
            <p class="card-text">{{ productDetail.name }} Short Sleeve UT</p>
            <ul id="listDetail">
                <li type="none">{{ productDetail.size }}</li>
                <li>Very Good</li>
                <li>Uniqlo</li>
            </ul>
            <hr>
            <p>Item Description</p>
            <p>{{ productDetail.description }}</p>
            <div class="container">
                <div class="row">
                    <div class="col-6 col-sm-6" style="margin-left: -10px;">
                        <p>Color</p>
                        <p>Store Name</p>
                        <p>Category</p>
                        <p>Brand</p>
                        <p>Condition</p>
                        <p>Uploaded</p>
                        <p>Shipping</p>
                    </div>
                    <div class="col-6 col-sm-6">
                        <p>{{ productDetail.color }}</p>
                        <p>Vintage</p>
                        <p>{{ productDetail.category }}</p>
                        <p>Uniqlo</p>
                        <p>Very Good</p>
                        <p>Mon, Nov 04, 2024</p>
                        <p>{{ productDetail.shipping }}</p>
                    </div>
                </div>
            </div>
            <hr>
            <button class="btn btn-primary mb-3" style="width: 330px;">Buy Now</button>
            <button @click="addToCart" class="btn btn-outline-info" style="width: 330px;">Add to Cart</button>
            <hr>
            <div class="detail__review border rounded d-flex">
                <img class="profile-image rounded-circle m-3" src="/src/assets/images/review.jpeg" alt="Icon Review" width="40" height="40">
                <p class="mt-3 fw-bold">Dudung Sarudung</p>
                <div style="margin-top: 35px; margin-left: -147px;">
                    <img src="/src/assets/images/stars.png" alt="stars" width="18" height="18">
                    <img src="/src/assets/images/stars.png" alt="stars" width="18" height="18">
                    <img src="/src/assets/images/stars.png" alt="stars" width="18" height="18">
                    <img src="/src/assets/images/stars.png" alt="stars" width="18" height="18">
                    <img src="/src/assets/images/stars.png" alt="stars" width="18" height="18">
                </div>
                <p style="margin-top: 37px; margin-left: 10px; font-size: 14px">(110)</p>
            </div>
        </div>
        </div>
    </div>
  </div>
</div>
    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay">
            <div class="modal-content">
                <video id="banner-video" width="200" height="200" style="margin-left: 90px;" autoplay muted playsinline loop>
                <source src="/src/assets/images/cart.webm" type="video/webm">
                </video>
                <h2 class="fw-bold">Product Successfully added to cart</h2>
                <p>Vintage <span class="fw-bold">{{ productDetail.name }}</span> Successfully added to cart. Check now on the cart or continue shopping</p>
                <router-link to="/"><button class="btn btn-outline-info">Continue Shopping</button></router-link>
                <router-link to="/cart"><button class="btn btn-primary">Go to Cart</button></router-link>
            </div>
        </div>
</template>

<script setup>
import { computed, reactive} from 'vue';
import { useStore } from 'vuex';
import { onMounted, ref } from 'vue';

const store = useStore();
const product = ref();
const showModal = ref(false);

onMounted(async () => {
    await store.dispatch("product/getProductData");
    product.value = store.state.product.products
})

const productDetail = computed(() => {
    return store.state.product.productDetail
})


const addToCart = () => {
    store.dispatch('cart/addToCart', productDetail.value);
    showModal.value = true;
};

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

.btn-primary {
  background-color: #0d6b6e;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  width: 380px;
}

.btn-outline-info {
    width: 380px;
}
</style>