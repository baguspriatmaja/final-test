<template>
    <div class="container" style="margin-top: 100px;">
      <div class="row">
        <div class="col-4 mt-4">
          <h2 class="mb-4 fw-bold">Settings</h2>
          <ul type="none"> 
              <router-link to="/personal-info" class="text-black"><li class="mb-4 fw-bold">Profile Details</li></router-link>
              <router-link to="/change-password" class="text-black"><li class="mb-4">Change Password</li></router-link>
              <router-link to="/transaction" class="text-black"><li class="mb-4">Transaction History</li></router-link>
              <router-link to="/my-products" class="text-black"><li class="mb-4">My Products</li></router-link>
          </ul>
        </div>
        <div class="col-8 mb-5">
          <div class="card mt-4 mb-5" style="width: 50rem; margin-left: -70px;">
              <div class="card-body mb-5">
                <h5 class="card-title mb-4">Edit Profile</h5>
                <div class="d-flex justify-content-between">
                  <p class="card-text text-black fw-bold">Photo</p>
                  <img :src="userData.imageLink" alt="profile" width="50" height="50" class="rounded-circle" style="margin-left: 100px;">
                  <input type="file" class="form-control-file" id="photo" accept="image/*" @change="onFileChange" style="margin-left:-50px; margin-top: 10px; max-width: 150px;">
                  <p class="mt-2 text-black" style="margin-bottom:-100px; margin-top: 50px;">JPG, JPEG, or PNG, 1 MB max.</p>
                  <i class="fa-solid fa-trash-can mt-2"></i>
                </div>
                <hr>
                <div class="mb-3">
                  <base-input v-model="userData.fullname" type="text" identity="fullname" placeholder="Enter your fullname" label="Fullname"></base-input>
                </div>
                <div class="mb-3">
                  <base-input v-model="userData.username" type="text" identity="username" placeholder="Enter your username" label="Username"></base-input>
                </div>
                <div class="mb-5">
                  <base-input v-model="userData.email" type="email" identity="email" placeholder="Enter your email" label="Email"></base-input>
                </div>
                <base-button @click="updateProfile" class="btn btn-primary" style="float: right; width: 150px;">Update Profile</base-button>
              </div>
            </div>
        </div>
      </div>
    </div>
    <web-footer></web-footer>
</template>


<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import BaseInput from '../ui/BaseInput.vue';
import BaseButton from '../ui/BaseButton.vue';
import WebFooter from '../footer/WebFooter.vue';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();
const userData = computed(() => store.state.auth.userLogin);

const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 1048576) { 
        const reader = new FileReader();
        reader.onload = (e) => {
            userData.value.imageLink = e.target.result; 
        };
        reader.readAsDataURL(file);
    } else {
        alert("File size exceeds 1 MB limit.");
    }
};

const updateProfile = async () => {
    try {
        const updatedUserData = {
            fullname: userData.value.fullname,
            username: userData.value.username,
            email: userData.value.email,
            imageLink: userData.value.imageLink,
        };
        await store.dispatch("auth/updateProfile", updatedUserData);
        alert("Profile updated successfully!");
        router.push("/")
    } catch (err) {
        console.error("Failed to update profile:", err);
    }
};
</script>
