<template>
    <div class="container" style="margin-top: 100px; margin-bottom: 200px">
      <div class="row">
        <div class="col-4 mt-4">
          <h2 class="mb-4 fw-bold">Settings</h2>
          <ul type="none"> 
              <router-link to="/personal-info" class="text-black"><li class="mb-4">Profile Details</li></router-link>
              <router-link to="/change-password" class="text-black"><li class="mb-4 fw-bold">Change Password</li></router-link>
              <router-link to="/transaction" class="text-black"><li class="mb-4">Transaction History</li></router-link>
              <router-link to="/my-products" class="text-black"><li class="mb-4">My Products</li></router-link>
          </ul>
        </div>
        <div class="col-8 mb-5">
            <div class="card mt-4 mb-5" style="width: 50rem; margin-left: -70px;">
                <div class="card-body mb-5">
                    <h5 class="card-title mb-4">Change Password</h5>
                    <div class="mb-5">
                    <base-input type="password" identity="oldPassword" placeholder="Old Password" label="Old Password"></base-input>
                    </div>
                    <div class="mb-5">
                    <base-input type="password" identity="password" placeholder="New Password" label="New Password"></base-input>
                    </div>
                    <div class="mb-3">
                    <base-input type="password" identity="confirmationPassword" placeholder="Confirmation Password" label="Confirmation Password"></base-input>
                    </div>
                    <base-button class="btn btn-primary" style="float: right; width: 150px;">Save Changes</base-button>
                </div>
                </div>
            </div>
        </div>
    </div>
    <web-footer></web-footer>
</template>

<script setup>
import BaseInput from '../ui/BaseInput.vue';
import BaseButton from '../ui/BaseButton.vue';
import WebFooter from '../footer/WebFooter.vue';
</script>