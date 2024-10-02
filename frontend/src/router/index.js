import { createRouter, createWebHistory } from 'vue-router';
import UserList from '../views/UserList.vue';
import UserForm from '../views/UserForm.vue';
import DefaultLayout from '../layouts/DefaultLayout.vue';

const routes = [
  {
    path: '/',
    name: 'DefaultLayout',
    component: DefaultLayout,
  }, 
  {
    path: '/user-list',
    name: 'UserList',
    component: UserList,
  },
  {
    path: '/add',
    name: 'UserForm',
    component: UserForm,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
