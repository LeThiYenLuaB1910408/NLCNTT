import { createWebHistory, createRouter } from "vue-router";
import HomeBody from "../components/Home/HomeBody.vue"
import LogIn from "../components/LogIn.vue"
import HomeHeaderStudent from "../components/Home/HomeHeaderStudent.vue"
import HomeHeaderLecturer from "../components/Home/HomeHeaderLecturer.vue"
import StudentBody from "../components/Student/StudentBody.vue"
import StudentBodyRegister from "../components/Student/StudentBodyRegister.vue";
import LecturerBody from "../components/Lecturer/LecturerBody.vue";
import { useAccountStore } from "@/stores/AccountStore";

const routes = [
    {
        path: "/",
        name: "home",
        components:{
            default: HomeBody,
            header: HomeHeaderStudent
        } 
    },
    {
        path: "/login",
        name: "login",
        component: LogIn
    
    },
    {
        path: "/ChuyenNganh/:id",
        name: "ChuyenNganh",
        components:{
            default: StudentBody,
            header: HomeHeaderStudent
        } 
    
    },
    {
        path: "/courses/:id",
        name: "courses",
        components:{
            default: StudentBodyRegister,
            header: HomeHeaderStudent
        } 
    
    },
    {
        path: "/lecturer",
        name: "lecturer",
        components:{
            default: LecturerBody,
            header: HomeHeaderLecturer
        } 
    
    },
    {
        path: "/QLLH",
        name: "QLLH",
        component: () => import('@/views/QLLH.vue'),
    },
    {
        path: "/QLTK",
        name: "QLTK",
        component: () => import('@/views/QLTK.vue'),
    },
    {
        path: "/QLSV",
        name: "QLSV",
        component: () => import('@/views/QLSV.vue'),
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import('@/views/NotFound.vue'),
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

// router.beforeEach((to, from, next)=> {
//     const AccountStore = useAccountStore();
//     if(!AccountStore.user.CapQuyen && to.name != 'login'){
//         next({
//             path: '/login',
//             replace: true,
//         })
//     }
//    next();
// });
export default router;