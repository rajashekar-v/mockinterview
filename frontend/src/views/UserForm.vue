<template>
  <div>
    <h1>Add User</h1>
    <form @submit.prevent="submitUser">
      <input v-model="name" placeholder="Name" required />
      <input v-model="email" placeholder="Email" required />
      <button type="submit">Add User</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      email: '',
    };
  },
  methods: {
    async submitUser() {
      await axios.post('http://localhost:5000/api/users', {
        name: this.name,
        email: this.email,
      });
      this.name = '';
      this.email = '';
      this.$router.push('/');
    },
  },
};
</script>
