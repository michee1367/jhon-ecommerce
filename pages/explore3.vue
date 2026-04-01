<template>
    <div class="p-4">
      <ClientOnly fallback-tag="span" fallback="Loading comments...">
          <LeafletMapRiverTile />
      </ClientOnly>

    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
      };
    },
    computed: {
      
    },
    methods: {
    }
  };
  </script>
  
  <style>
  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
  </style>
  