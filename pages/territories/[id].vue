<template>
    <div>
  
        <TopNavbar />
        <ClientOnly fallback-tag="span" fallback="Loading comments...">
            <LeafletMap :mapId="$route.params.id" />
        </ClientOnly>
    </div>
  </template>
  
  <script>
  
  export default {
    
    
  };
  </script>
  
  <style>
  
  </style>
  