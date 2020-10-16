<template>
  <div id="profile" class="container mx-auto px-4 pt-4 h-full">
    <div class="bg-white rounded overflow-hidden shadow dark:bg-gray-700">
      <div class="py-4">
        <img class="mx-auto rounded-full max-w-full" :src="userProfile.photoURL" alt="Profile picture" />
      </div>
      <div class="text-center">
        <h1 class="text-2xl">{{ userProfile.displayName }}</h1>
        <p>{{ userProfile.email }}</p>
      </div>
      <div class="py-4 text-center">
        <button class="btn" @click="logout">Déconnexion</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Profile',
  methods: {
    async logout() {
      await this.$store.dispatch('users/logout');
      this.$router.replace({ name: 'Randomizer' });
    },
  },
  computed: {
    ...mapState({
      userProfile: (state) => state.users.user,
    }),
  },
};
</script>

<style scoped>

</style>
