<template>
    <div>
      <AppHeader />
      <main>
        <slot></slot> <!-- This will render the dynamic content -->
      </main>
      <AppFooter />
    </div>
  </template>
  
  <script>
  import AppHeader from './AppHeader.vue'; // Updated import
  import AppFooter from './AppFooter.vue'; // Updated import
  
  export default {
    name: "DefaultLayout",
    components: {
      AppHeader,
      AppFooter,
    },
  };
  </script>
  
  <style scoped>
  /* Add styles for your layout here */
  main {
    padding: 20px;
  }
  </style>
  