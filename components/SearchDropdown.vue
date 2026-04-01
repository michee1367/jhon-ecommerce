<template>
    <div class="relative w-64">
      <input
        v-model="query"
        @input="onInput"
        type="text"
        placeholder="Rechercher..."
        class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
      />
  
      <!-- Dropdown -->
      <ul
        v-if="results.length && query"
        class="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-60 overflow-auto shadow-lg"
      >
        <li
          v-for="item in results"
          :key="item.id"
          @click="selectItem(item)"
          class="px-3 py-2 hover:bg-blue-100 cursor-pointer"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from "vue";
  
  // Props si tu veux passer l'API ou les données
  const props = defineProps({
    fetchData: {
      type: Function,
      required: true, // fonction qui retourne les résultats en fonction d'une query
    },
  });
  
  // Réactivité
  const query = ref("");
  const results = ref([]);
  
  // Fonction appelée à chaque saisie
  const onInput = async () => {
    if (query.value.length < 2) {
      results.value = [];
      return;
    }
  
    //results.value = await props.fetchData(query.value);
    results.value = [];
  };
  
  // Quand on clique sur un élément
  const selectItem = (item) => {
    query.value = item.name;
    results.value = [];
    // Tu peux émettre un événement vers le parent si besoin
    emit("select", item);
  };
  </script>
  
  <style scoped>
  /* Tu peux ajouter ton style ici si besoin */
  </style>
  