<template>
  <div id="app" class="flex flex-col h-screen">
    <div class="flex-1 relative overflow-x-hidden bg-gray-100">
      <router-view/>
    </div>
    <Navbar/>
  </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue';

export default {
  components: { Navbar },
};
</script>
