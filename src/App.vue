<template>
  <div id="app" class="container mx-auto px-4">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link :to="{name: 'Admin'}">Ajouter des données</router-link>
    </div>
    <router-view/>
  </div>
</template>
