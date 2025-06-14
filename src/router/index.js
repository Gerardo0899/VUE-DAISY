import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProjectTasksView from '../views/ProjectTasksView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/project/:id', name: 'project', component: ProjectTasksView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router