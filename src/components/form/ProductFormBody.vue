<template>
    <li class="list-group-item">
      <form @submit.prevent="addNewProduct">
        <!-- General Information Start -->
        <div>
          <p class="my-3 fs-5 fw-semibold">General Information</p>
          <div>
            <!-- Image Start -->
            <div class="mb-3">
              <base-input type="file" identity="productImage" label="Photo Product" @input="checkImage"></base-input>
              <div>
                <img :src="productData.image" :alt="productData.name" class="image">
              </div>
            </div>
            <!-- Image End -->
  
            <!-- Product Name Start -->
            <div class="mb-3">
              <base-input type="text" identity="productTitle" placeholder="Give your product a title" label="Product Title" v-model="productData.name"></base-input>
            </div>
            <!-- Product Name  End -->
  
            <!-- Product Cateogry Start -->
            <div class="mb-3">
              <base-select :data="['T-Shirt', 'Shirt', 'Crewneck', 'Hoodie', 'Jacket', 'Pants']" v-model="productData.category"></base-select>
            </div>
            <!-- Product Category End -->

            <!-- Product Color Start -->
            <div class="mb-3">
                <base-input type="text" identity="productColor" placeholder="Give color information to your product" label="Product Color" v-model="productData.color"></base-input>
            </div>
            <!-- Product Color End -->

            <!-- Product Size Start -->
            <div class="mb-3">
                <base-select :data="['S', 'M', 'L', 'XL', 'XXL']" v-model="productData.size"></base-select>
            </div>
            <!-- Product Size End -->

            <!-- Product Price Start -->
            <div class="mb-3">
                <base-input type="number" identity="productPrice" placeholder="Give price to your product" label="Product Price" v-model="productData.price"></base-input>
            </div>
            <!-- Product Price End -->

            <!-- Product Shipping Start -->
            <div class="mb-3">
                <base-input type="number" identity="productShipping" placeholder="Give shipping price to your product" label="Product Shipping" v-model="productData.shipping"></base-input>
            </div>
            <!-- Product Shipping End -->
            
            <!-- Product Description Start -->
            <div class="mb-3">
                <base-text-area identity="productDescription" label="Description" placeholder="Give a product description" v-model="productData.description"></base-text-area>
            </div>
            <!-- Product Description End -->
          </div>
        </div>
        <!-- General Information End -->
  
        <!-- Form Button Start -->
        <div class="border-top py-3 d-flex my-4 justify-content-end">
          <!-- Submit Button Start -->
          <base-button class="btn-primary px-3 py-2 ms-1">Submit</base-button>
          <!-- Submit Button End -->
        </div>
        <!-- Form Button End -->
      </form>
    </li>
</template>

<script setup>
import BaseInput from '../ui/BaseInput.vue';
import BaseTextArea from '../ui/BaseTextArea.vue';
import BaseSelect from '../ui/BaseSelect.vue';
import BaseButton from '../ui/BaseButton.vue';
import { onMounted, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';

const store = useStore()
const router = useRouter()
const route = useRoute()

const addNewProduct = async () => {
  if (props.isEdit) {
    await store.dispatch("product/updateProduct", { id: route.params.id, newProduct: productData.value });
  } else {
    await store.dispatch("product/addNewProduct", productData.value);
  }
  router.push("/my-products");
};


const productData = ref({
  image: "",
  name: "",
  description: "",
  category: "",
  color: "",
  size: "",
  price: "",
  shipping: "",
});

const checkImage = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.addEventListener("load", () => {
    productData.value.image = reader.result;
  });
};

const props = defineProps({
    isEdit: { type: Boolean, default: false },
})

onMounted(() => {
  if (props.isEdit) {
    productData.value = store.state.product.productDetail;
  }
})
</script>   