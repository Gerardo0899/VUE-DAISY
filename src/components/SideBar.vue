<!-- src/components/SideBar.vue -->
<template>
  <div class="w-64 min-h-full p-4 bg-base-200">
    <!-- Encabezado -->
    <h2 class="text-lg font-bold mb-1">Proyectos</h2>
    <p class="text-sm text-gray-400 mb-4">
      {{ projectsStore.projects.length === 0 ? 'No hay proyectos' : `${projectsStore.projects.length} proyecto(s)` }}
    </p>

    <!-- Lista de proyectos como enlaces -->
    <ul class="menu bg-base-300 rounded-box w-full">
      <li v-for="project in projectsStore.projects" :key="project.id">
        <router-link
          :to="`/project/${project.id}`"
          class="text-sm flex items-center gap-2 py-2 px-3 hover:bg-base-100 rounded transition"
        >
          📁 {{ project.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useProjectsStore } from '@/stores/projectsStore'
const projectsStore = useProjectsStore()
</script>
