<script>
import AdminSiderBar from "@/components/Admin/AdminSiderBar.vue";
import AdminHeader from "@/components/Admin/AdminHeader.vue";
export default {
    components: {
        AdminSiderBar,
        AdminHeader,
    },
}

</script>

<template> 
    <AdminHeader />
    <div class="container-fluid">
        <div class="row">
            <AdminSiderBar />
            <RouterView />
        </div>
    </div>
</template>