<script></script>

<template>
  <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
    <div class="position-sticky pt-4">
      <ul class="nav flex-column">
        <li class="nav-item mb-3">
          <router-link :to="{ name: 'QLTK' }" class="nav-link text-dark" aria-current="page">
            <i class="fa-regular fa-user"></i>
            Quản Lý Tài Khoản
          </router-link>
        </li>
        <li class="nav-item mb-3">
          <router-link class="nav-link text-dark" aria-current="page" :to="{ name: 'QLLH' }">
            <i class="fa-solid fa-landmark"></i>
            Quản Lý Lớp Học
          </router-link>
        </li>
        <li class="nav-item mb-3">
          <router-link :to="{ name: 'QLSV' }" class="nav-link text-dark" aria-current="page" href="#">
            <i class="fa-solid fa-users"></i>
            Quản Lý Sinh Viên
          </router-link>
        </li>
        <li class="nav-item mb-3">
          <router-link :to="{ name: 'QLGV' }" class="nav-link text-dark" aria-current="page" href="#">
            <i class="fa-solid fa-chalkboard-user"></i>
            Quản Lý Giảng Viên
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'QLCB' }" class="nav-link text-dark" aria-current="page" href="#">
            <i class="fa-solid fa-person-chalkboard"></i>
            Quản Lý Cán Bộ
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.sidebar {
  height: 650px;
}

li:hover,
li:active {
  background-color: rgba(108, 105, 105, 0.385);
}
</style>
