<template>
  <div class="page">
    <Sidebar />
      
      <Topbar />
      <div class="page-wrapper">
        <slot />
      </div>
  </div>
</template>

<script setup>
import Sidebar from "~/components/Sidebar.vue"
import Topbar from "~/components/TopBar.vue"
</script>

<style scoped>
.layout {
  display: flex;
}

.main {
  flex: 1;
  background: #f5f7fb;
  min-height: 100vh;
}

.content {
  padding: 2rem;
}


</style>
