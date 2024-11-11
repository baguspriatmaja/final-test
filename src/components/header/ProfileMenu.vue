<template>
  <div class="header__signup col-8 col-sm-5 fw-semibold d-flex justify-content-evenly align-items-center text-decoration-none" style="text-align: right">
    <div class="icon-container d-flex justify-content-between me-3">
      <router-link to="/cart"><img src="/src/assets/images/cart.png" alt="cart" width="40" height="40" style="color: black;"> <span><p class="dot" style="margin-left: -20px;">{{ cartProducts.length }}</p></span></router-link>
    </div>
    <div class="icon-container me-3 mt-1">
      <router-link to="/cart"><i class="fa fa-heart text-black fs-4 pe-2"></i><span class="dot-heart">0</span></router-link>
    </div>
    <ul class="navbar-nav">
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle profile-icon" href="#" role="button" data-bs-toggle="dropdown">
          <img :src="userData.imageLink" alt="Profile Picture" class="profile-image rounded-circle me-2" width="40" height="40" />
        </a>
        <ul class="dropdown-menu">
          <router-link to="/personal-info" class="dropdown-item"><span><i class="fa-regular fa-user me-2"></i></span>Profile</router-link>
          <router-link to="/transaction" class="dropdown-item"><span><img src="/src/assets/images/scroll.png" alt="scroll" width="20" height="20" class="me-1" style="margin-left: -2px;"></span>Order</router-link>
          <li><hr class="dropdown-divider"/></li>
          <li>
            <button class="dropdown-item" @click="showLogoutModal"><span><img src="/src/assets/images/logout.png" alt="logout" width="23" height="23" class="me-1" style="margin-left: -2px;"></span>Logout</button>
          </li>
        </ul>
      </li>
    </ul>
    <div class="dropdown">
        <a class="btn btn-drop dropdown-toggle" href="#" role="button"  data-bs-toggle="dropdown" aria-expanded="false">
          EN
        </a>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">IND</a></li>
          <li><a class="dropdown-item" href="#">JPN</a></li>
        </ul>
      </div>
  </div>

  <!-- Logout Confirmation Modal -->
  <teleport to="body">
  <div class="modal fade" id="logoutModal" tabindex="-1" aria-labelledby="logoutModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="logoutModalLabel">Logout</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Are you sure you want to logout from vintage?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-danger" @click="confirmLogout">Logout</button>
        </div>
      </div>
    </div>
  </div>
  </teleport>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore()
const router = useRouter()

const userData = computed(() => {
    return store.state.auth.userLogin
})

const showLogoutModal = () => {
  const modalElement = document.getElementById('logoutModal');
  const modal = new bootstrap.Modal(modalElement);
  modal.show();
}

const confirmLogout = () => {
  store.commit("auth/setUserLogout")
  router.push("/")
  const modal = bootstrap.Modal.getInstance(document.getElementById('logoutModal'))
  modal.hide()
}

const cartProducts = computed (() => {
    return store.state.cart.cartProducts;
})  

</script>

<style scoped>

.dot {
  height: 21px;
  width: 21px;
  background-color: darkred;
  border-radius: 50%;
  color: white;
  margin-top: 3px;
  padding-top: 1px;
  margin-left: -20px; 
  display: inline-block;               
  text-align: center;
  vertical-align: top;
  font-size: 15px;
}

.dot-heart {
  height: 21px;
  width: 21px;
  background-color: darkred;
  border-radius: 50%;
  color: white;
  margin-top: -5px;
  padding-top: 1px;
  margin-left: -20px; 
  display: inline-block;               
  text-align: center;
  vertical-align: top;
  font-size: 15px;
}



</style>