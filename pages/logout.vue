<template>
    <div>
    </div>
</template>
<script setup lang="ts">
//import axios from "axios";
import { useUserConnectStore } from "@/stores/user";
import { useProjectStore } from "@/stores/project";
definePageMeta({
    
  middleware: [
    'auth',
    async function  (to, from) {
        
      if (process.server) return
        // Custom inline middleware
        const userStore = useUserConnectStore(
        )
        const projectStore = useProjectStore()
        console.log("############OK##############")
        await userStore.logout()
        projectStore.clear()
        
        return navigateTo('/login')
    },
  ],
});

</script>