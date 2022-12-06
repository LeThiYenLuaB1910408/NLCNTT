<script></script>

<template>
  <div class="container bo-mon my-4">
    <div class="row text-center mb-4" >
      <h5>CÁC KHOA TRƯỜNG CÔNG NGHỆ THÔNG TIN VÀ TRUYỀN THÔNG</h5>
    </div>
    <div class="cntt">
      <div class="row img">
        <div class="col-md-6 pe-0">
          <img src="../../assets/it1.jpg" />
          <div class="title">
            <router-link to="/ChuyenNganh/CNTT" class="p1">CÔNG NGHỆ THÔNG TIN</router-link>
          </div>
        </div>
        <div class="col-md-6 ps-0">
          <img src="../../assets/it2.jpg" />
          <div class="title">
            <router-link to="/ChuyenNganh/CNPM" class="p1">CÔNG NGHỆ PHẦN MỀM</router-link>
          </div>
        </div>
      </div>
      <div class="row img">
        <div class="col-md-6 pe-0">
          <img src="../../assets/it3.png" />
          <div class="title">
            <router-link to="/ChuyenNganh/HTTT" class="p1">HỆ THỐNG THÔNG TIN</router-link>
          </div>
        </div>
        <div class="col-md-6 ps-0">
          <img src="../../assets/it4.jpg" />
          <div class="title">
            <router-link to="/ChuyenNganh/MMT&TT" class="p1">MẠNG MÁY TÍNH & TRUYỀN THÔNG</router-link>
          </div>
        </div>
      </div>
      <div class="row img">
        <div class="col-md-6 pe-0">
          <img src="../../assets/it5.jpg" />
          <div class="title">
            <router-link to="/ChuyenNganh/KHMT" class="p1">KHOA HỌC MÁY TÍNH</router-link>
          </div>
        </div>
        <div class="col-md-6 ps-0">
          <img src="../../assets/it6.jpg" />
          <div class="title">
            <router-link to="/ChuyenNganh/THUD" class="p1">TIN HỌC ỨNG DỤNG</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container thuc-tap mb-5" >
    <div class="row">
      <div class="text-center mb-5">
        <h5 id="2">CÁC KHÓA THỰC TẬP</h5>
      </div>
    </div>
    <div class="row m-auto">
      <div class="card col-md-3 me-5 rounded-0 p-0" style="width: 18rem">
        <img
          class="card-img-top"
          src="../../assets/internship.webp"
          alt="Card image cap"
        />

        <div class="card-body">
          <a href="#">
            <p class="card-text">Thực Tập Thực Tế Khóa 2019-2020</p>
          </a>
        </div>
      </div>
      <div class="card col-md-3 me-5 rounded-0 p-0" style="width: 18rem">
        <img
          class="card-img-top"
          src="../../assets/internship-f.jpg"
          alt="Card image cap"
        />
        <div class="card-body">
          <a href="">
            <p class="card-text">Thực Tập Thực Tế Khóa 2020-2021</p>
          </a>
        </div>
      </div>
      <div class="card col-md-3 me-5 rounded-0 p-0" style="width: 18rem">
        <img
          class="card-img-top"
          src="../../assets/internship2-getty.jpg"
          alt="Card image cap"
        />

        <div class="card-body">
          <a href="">
            <p class="card-text">Thực Tập Thực Tế Khóa 2021-2022</p>
          </a>
        </div>
      </div>
      <div class="card col-md-3 rounded-0 p-0" style="width: 18rem">
        <img
          class="card-img-top"
          src="../../assets/internship.webp"
          alt="Card image cap"
        />

        <div class="card-body">
          <a href="">
            <p class="card-text">Thực Tập Thực Tế Khóa 2022-2023</p>
          </a>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid tuyen-dung pt-5 pb-5" >
    <div class="row">
      <div class="text-center mb-5 text-light">
        <h5 id="3">NHÀ TUYỂN DỤNG</h5>
      </div>
    </div>
    <div class="container w-50">
      <div class="row mb-5 text-center">
        <div class="col-md-4">
          <img src="../../assets/techbase.webp" />
        </div>
        <div class="col-md-4">
          <img src="../../assets/fpt.png" />
        </div>
        <div class="col-md-4">
          <img src="../../assets/vnpt.webp" />
        </div>
      </div>
      <div class="row text-center">
        <div class="col-md-4">
          <img src="../../assets/amazon.png" />
        </div>
        <div class="col-md-4">
          <img src="../../assets/axon.png" />
        </div>
        <div class="col-md-4">
          <img src="../../assets/kms.jpg" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cntt {
  width: 50%;
  margin: auto;
}

img {
  height: 100% !important;
  width: 100%;
  opacity: 0.8;
}
.bo-mon img:hover,
.bo-mon img:active {
  opacity: 0.25;
}
.title {
  text-align: center;
}
.p1 {
  position: relative;
  bottom: 50px;
  color: white;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
}
.thuc-tap {
  border-top: 5px solid rgba(51, 73, 183, 0.814);
  padding: 30px 0;
}
.card {
  cursor: pointer;
}
img:hover,
img:active {
  opacity: none !important;
}
.card-body {
  background-color: rgba(51, 73, 183, 0.814);
}
.card-body a {
  text-decoration: none;
  color: white;
}
.tuyen-dung {
  background: rgba(51, 73, 183, 0.814);
}
.tuyen-dung img {
  width: 50%;
  border: 1px solid rgb(117, 117, 117);
  border-radius: 50%;
}
</style>
