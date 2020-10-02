<template>
  <div id="app" class="flex flex-col h-screen">
    <div class="flex-1 relative overflow-hidden">
      <transition name="fade">
        <router-view/>
      </transition>
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
