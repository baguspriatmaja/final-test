<template>
    <div class="container">
      <div class="row align-items-center mt-5">
        <div class="col"></div>
        <div class="col mt-5">
          <div class="card mt-3 mb-5" style="width: 30rem;">
              <div class="container h-100">
                  <div class="card-body w-100 m-auto">
                      <div class="d-flex justify-content-between mb-4">
                          <h4>Sign Up</h4>
                          <i class="fa-solid fa-x mt-1"></i>
                      </div>
                      <p class="text-black">Enter your details below</p>
                      <form class="mt-1" @submit.prevent="register">
                          <div class="mb-3">
                            <base-input type="text" identity="fullname" placeholder="Enter your fullname" label="Fullname" v-model="signupData.fullname"></base-input>
                          </div>
                          <div class="mb-3">
                            <base-input type="text" identity="username" placeholder="Enter your username" label="Username" v-model="signupData.username"></base-input>
                          </div>
                          <div class="mb-3">
                            <base-input type="email" identity="email" placeholder="Enter your email" label="Email" v-model="signupData.email"></base-input>
                          </div>
                          <div class="mb-3">
                            <base-input type="password" identity="password" placeholder="Enter your password" label="Password" v-model="signupData.password" @keyInput="passwordCheck"></base-input>
                            <p class="text-danger mt-1 fw-medium" style="font-size: 11px;" :style="{ display: passwordStatusDisplay }">
                              The password field must be at least 8 characters
                            </p>
                          </div>
                          <div class="mb-3">
                            <base-input type="password" identity="confirmationPassword" placeholder="Same with password" label="Confirmation Password" v-model="signupData.confirmationPassword" @keyInput="confirmationPasswordCheck"  ></base-input>
                            <p class="text-danger mt-1 fw-medium" style="font-size: 11px;" :style="{ display: confirmPasswordDoesNotMatch }">
                              The password confirmation does not match
                            </p>
                            <p class="text-success mt-1 fw-medium" style="font-size: 11px;" :style="{ display: confirmPasswordMatch }">
                              The password confirmation does match
                            </p>
                            </div>
                          <div class="my-4">
                          <base-input type="file" identity="productImage" label="Profile Photo" isImage="true" @input="checkImage">
                            <div>
                              <div class="border p-1 mt-2 rounded-circle">
                                <img :src="signupData.imageLink" class="rounded-circle" width="140" height="150" style="object-fit: cover;">
                              </div>
                              <div class="text-center" style="transform: translateY(-24px)">
                                <i class="fa-solid fa-camera fs-5 p-2 rounded-circle bg-white"></i>
                              </div>
                            </div>
                          </base-input>
                        </div>
                        <div class="mb-3 form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1">
                            <label class="form-check-label" for="exampleCheck1">By clicking sign up, I hereby agree and consent to <span style="color: #63cdc3;">Term & Conditions;</span> I confirm that i have read <span style="color: #63cdc3;;">Privacy policy.</span></label>
                        </div>
                        <base-button class="login btn-primary w-100 my-3">Register</base-button>
                        </form>
                        <div class="text-center mt-4">
                        <p class="fw-semibold">
                          Already have account?<span style="color: #4c4ddc"
                            ><router-link to="/login" class="text-decoration-none"> Login</router-link></span>
                        </p>
                      </div>
                    </div>
                  </div>
              </div>
        </div>
        <div class="col"></div>
      </div>
    </div>
    
    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <img src="/src/assets/images/paper.png" alt="Paper Plane" width="250" height="200" style="margin: auto;">
        <h2>Successfully Register</h2>
        <p>Thank you for registering at Vintage. Start finding your favorite pre-loved products here.</p>
        <router-link to="/"><button class="btn btn-primary">Go to Home Page</button></router-link>
      </div>
    </div>
</template>

<script setup>
import BaseInput from '../ui/BaseInput.vue';
import BaseButton from '../ui/BaseButton.vue';
import { reactive, ref } from 'vue';
import { useStore } from "vuex";
import { useRouter } from 'vue-router';

const store = useStore()
const router = useRouter()
const showModal = ref(false);

const register = async () => {
  if (
    signupData.password !== signupData.confirmationPassword || signupData.password.length < 8
  ) {
    signupData.confirmationPassword = "";
    signupData.password = "";
    confirmPasswordDoesNotMatch.value = "none";
    confirmPasswordMatch.value = "none";
  } else {
    await store.dispatch("auth/getRegisterData", signupData);
    showModal.value = true;
  }
}

const passwordStatusDisplay = ref("none")

const passwordCheck = () => {
  if ( signupData.password.length < 8 ) {
    passwordStatusDisplay.value = "block"
  } else {
    passwordStatusDisplay.value = "none"
  }
};

const confirmPasswordDoesNotMatch = ref("none");
const confirmPasswordMatch = ref("none");

const confirmationPasswordCheck = () => {
  if (signupData.confirmationPassword === "") {
    confirmPasswordDoesNotMatch.value = "none";
    confirmPasswordMatch.value = "none"; 
    return;
  }

  if (signupData.password !== signupData.confirmationPassword) {
    confirmPasswordDoesNotMatch.value = "block";
    confirmPasswordMatch.value = "none";
    return;
  }

  confirmPasswordDoesNotMatch.value = "none";
  confirmPasswordMatch.value = "block";
};

const checkImage = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader ();
  reader.readAsDataURL(file);

  reader.addEventListener("load", () => {
    signupData.imageLink = reader.result;
  } )
}

const signupData = reactive({
  fullname: "",
  username: "",
  email: "",
  password: "",
  confirmationPassword: "",
  isLogin: false,
  imageLink: "",
});

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
</style>