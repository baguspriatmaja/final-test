<template>
    <main>
        <div class="container-md my-5 py-5">
            <product-form v-if="detailData && !isLoading" :isEdit="true"></product-form>
        </div>
    </main>
</template>

<script setup>
import ProductForm from '../form/ProductForm.vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';

const store = useStore();
const route = useRoute();
const detailData = ref();
const isLoading = ref(false);

onMounted(async () => {
    isLoading.value = true;
    await store.dispatch("product/getProductDetail", route.params.id);
    detailData.value = store.state.product.productDetail;
    isLoading.value = false;
});
</script>