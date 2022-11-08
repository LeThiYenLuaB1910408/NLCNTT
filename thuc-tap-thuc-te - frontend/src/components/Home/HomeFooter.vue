<script setup></script>

<template>
  <div class="footer row mt-4 mb-2">
    <div class="link col-md-4 text-center">
      <i class="fa-solid fa-paperclip me-2"></i>
      <a
        href="https://helpdesk.ctu.edu.vn/"
        class="text-dark text-decoration-none"
        >https://helpdesk.ctu.edu.vn</a
      >
    </div>
    <div class="row col-md-4 text-center">
      <div class="mail">
        <i class="fa-regular fa-envelope me-2"></i>
        <a>helpdesk@ctu.edu.vn</a>
      </div>
    </div>
    <div class="icon col-md-4 text-center">
      <a href="https://www.facebook.com/ctudhct"><i class="fa-brands fa-facebook"></i></a>
      <a href="https://instagram.com/ctudhct"><i class="fa-brands fa-instagram"></i></a>
      <a href="https://www.youtube.com/ctudhct"><i class="fa-brands fa-youtube"></i></a>
      <a href="https://www.linkedin.com/school/ctudhct/"><i class="fa-brands fa-linkedin-in"></i></a>
    </div>
  </div>
</template>

<style scoped>
.footer {
  margin: 0;
  display: flex;
  justify-content: center;
}
.icon {
  display: flex;
  justify-content: center;
}
.icon i {
  margin-right: 5px;
  padding: 5px;
  font-size: 20px;
  color: rgba(51, 73, 183, 0.814);
  border: 2px solid;
}
</style>
