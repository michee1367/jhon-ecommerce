<template>
  <div>

    <TopNavbar />
                      <ClientOnly fallback-tag="span" fallback="Loading comments...">
                          <LeafletMap />
                      </ClientOnly>
  </div>
</template>

<script>

export default {
  
};
</script>

<style>

</style>
