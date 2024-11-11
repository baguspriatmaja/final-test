<template>
    <div class="col ms-5 d-flex align-items-center">
      <router-link to="/login"><button type="button" class="btn btn-log btn-outline-info ms-5 me-2">Login</button></router-link>
      <router-link to="/signup"><button type="button" class="btn btn-sign me-3">Sign Up</button></router-link>
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
</template>