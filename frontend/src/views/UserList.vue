<template>
  <div>
    <h1>User List</h1>
    <router-link to="/add">Add User</router-link>
    <ul>
      <li v-for="user in users" :key="user.id">{{ user.name }} - {{ user.email }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
    };
  },
  async created() {
    const response = await axios.get('http://localhost:5000/api/users');
    this.users = response.data;
  },
};
</script>
