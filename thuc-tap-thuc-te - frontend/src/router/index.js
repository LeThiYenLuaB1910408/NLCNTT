import { createWebHistory, createRouter } from "vue-router";
import LecturerBody from "@/views/Lecturer/LecturerBody.vue";
import LeaderBody from "@/views/Lecturer/LeaderBody.vue";
import CanBoBody from "@/views/Lecturer/CanBoBody.vue";
import InfoStudentBody from "@/views/Lecturer/InfoStudentBody.vue";

import { useAccountStore } from "@/stores/AccountStore";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Auth/LogIn.vue"),
  },
  {
    path: "/",
    component: () => import("@/views/Layouts/DefaultLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/views/Home/HomeBody.vue"),
      },
      {
        path: "/ChuyenNganh/:id",
        name: "ChuyenNganh",
        component: () => import("@/views/Student/StudentBody.vue"),
      },
      {
        path: "/courses/:id",
        name: "courses",
        component: () => import("@/views/Student/StudentBodyRegister.vue"),
      },
      {
        path: "/courses/:MaLop/:MSGV/:TenBaoCao",
        name: "submit",
        component: () => import("@/views/Student/SubmitFile.vue"),
      },
    ],
  },
  {
    path: "/manager",
    component: () => import("@/views/Layouts/ManagerLayout.vue"),
    children: [
      {
        path: "/leader",
        name: "leader",
        component: LeaderBody,
      },
      {
        path: "/lecturer",
        name: "lecturer",
        component: LecturerBody,
      },
      {
        path: "/canbo",
        name: "canbo",
        component: CanBoBody,
      },
      {
        path: "/canbo/:MSGV/:MSSV",
        name: "detail",
        component: InfoStudentBody,
      },
    ],
  },

  {
    path: "/admin",
    component: () => import("@/views/Layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        name: "QLTK",
        component: () => import("@/views/Admin/QLTK.vue"),
      },
      {
        path: "/QLLH",
        name: "QLLH",
        component: () => import("@/views/Admin/QLLH.vue"),
      },
      {
        path: "/QLSV",
        name: "QLSV",
        component: () => import("@/views/Admin/QLSV.vue"),
      },
      {
        path: "/QLCB",
        name: "QLCB",
        component: () => import("@/views/Admin/QLCB.vue"),
      },
      {
        path: "/QLGV",
        name: "QLGV",
        component: () => import("@/views/Admin/QLGV.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const AccountStore = useAccountStore();
  if (!AccountStore.user.CapQuyen && to.name != "login") {
    next({
      path: "/login",
      replace: true,
    });
  }
  next();
});
export default router;
