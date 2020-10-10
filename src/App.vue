<template>
  <div id="app" class="flex flex-col">
    <div class="flex-1 relative overflow-x-hidden bg-gray-100 dark:bg-gray-800 dark:text-white">
      <router-view/>
    </div>
    <Navbar/>
  </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue';

export default {
  components: { Navbar },
  created() {
    // Trick for full height display on mobile
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    window.addEventListener('resize', () => {
      vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
  },
};
</script>
