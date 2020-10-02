<template>
  <div class="bg-white w-full border-t border-gray-200 flex sticky bottom-0">
    <router-link :to="{name: 'Randomizer'}" class="flex flex-grow items-center justify-center p-2 text-gray-500 hover:text-teal-600" exact>
      <div class="text-center">
        <span class="block h-8 text-3xl leading-8">
            <svg class="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 14l9-5-9-5-9 5 9 5z"></path><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path></svg>
        </span>
        <span class="block text-xs leading-none">Quizz</span>
      </div>
    </router-link>
    <router-link :to="{name: 'Admin'}" class="flex flex-grow items-center justify-center p-2 text-gray-500 hover:text-teal-600" exact>
      <div class="text-center">
        <span class="block h-8 text-3xl leading-8">
            <svg class="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
        </span>
        <span class="block text-xs leading-none">Données</span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style scoped>
  .router-link-active {
    @apply text-teal-500;
  }
</style>
