<template>
    <div class="container">
      <div class="row align-items-center mt-5">
        <div class="col"></div>
        <div class="col mt-5">
          <div class="card mt-5" style="width: 27rem;">
              <div class="container h-100">
                  <div class="card-body w-100 m-auto">
                      <div class="d-flex justify-content-between mb-3">
                          <h4>Login to Vintage</h4>
                      </div>
                      <p class="text-black">Enter your details below</p>
                      <form @submit.prevent="login">
                          <div class="mb-3">
                            <base-input type="email" identity="email" placeholder="Enter your email" label="Email Address" v-model="loginData.email"></base-input>
                          </div>
                          <div class="mb-3">
                            <base-input type="password" identity="password" placeholder="Enter Your Password" label="Password" v-model="loginData.password"></base-input>
                          </div>
                          <div class="mb-3 form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1">
                            <label class="form-check-label" for="exampleCheck1">Remember Me</label>
                          </div>
                          <base-button class="login btn-primary w-100 my-3">Login</base-button>    
                        </form>
                        <div class="text-center mt-4">
                        <p class="fw-semibold">
                          Don’t have an account?<span style="color: #4c4ddc">
                            <router-link to="/signup" class="text-decoration-none">
                              Signup</router-link></span>
                        </p>
                      </div>
                    </div>
                  </div>
              </div>
        </div>
        <div class="col"></div>
      </div>
    </div>
</template>

<script setup>
import BaseInput from '../ui/BaseInput.vue';
import BaseButton from '../ui/BaseButton.vue';
import { reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore()
const router = useRouter()

const login = async () => {
  await store.dispatch("auth/getLoginData", loginData);
  router.push("/")
}

const loginData = reactive({
  email: "",
  password: "",
  isLogin: true
})
</script>