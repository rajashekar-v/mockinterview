<template>
  <header>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/user-list">Users</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "AppHeader",  // Changed from Header to AppHeader
};
</script>

<style scoped>
/* Add styles for your header here */
</style>
