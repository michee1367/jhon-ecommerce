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
.page {
  display: flex;
  min-height: 100vh;
}

.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.page-wrapper {
  flex: 1;
  padding: 2rem;
  /* --- AJOUT DU BACKGROUND --- 
  background-image: url('/public/img/background_optimized.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;*/ /* L'image reste fixe lors du scroll */
  
  /* Optionnel : superposition d'une légère couche blanche si le contenu est dur à lire 
   background-blend-mode: overlay; 
  background-color: rgba(255, 255, 255, 0.1);*/
}
.card-text {
  background-color: rgba(255, 255, 255, 0.95); /* Blanc quasi opaque */
  color: #1a202c; /* Un noir adouci */
  padding: 1rem;
  border-radius: 8px;
  border: 2px solid #a32a2a; /* Le rappel rouge de votre exemple */
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}
.text-on-forest {
  color: white;
  font-weight: bold;
  /* Ombre : 0px décalage, 0px décalage, 8px de flou noir */
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8); 
}
</style>