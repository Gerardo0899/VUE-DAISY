<template>
  <div class="p-6 relative">
    <div class="overflow-x-auto">
      <table class="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Proyecto</th>
            <th>Tareas</th>
            <th>Avance</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(project, index) in projectsStore.projects" :key="project.id">
            <th>{{ index + 1 }}</th>
            <td>{{ project.name }}</td>
            <td>{{ project.tasks.length }}</td>
            <td>
              <div class="flex items-center gap-2">
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    class="bg-purple-400 h-2.5 rounded-full transition-all duration-300" 
                    :style="`width: ${project.progress}%`"
                  ></div>
                </div>
                <span class="text-sm font-medium text-purple-400">{{ project.progress }}%</span>
              </div>
            </td>
            <td>
              <div class="flex gap-2">
                <button class="btn btn-sm btn-outline btn-primary" @click="editProject(project)">Editar</button>
                <button class="btn btn-sm btn-outline btn-error" @click="projectsStore.deleteProject(project.id)">Eliminar</button>
              </div>
            </td>
          </tr>
          <tr v-if="projectsStore.projects.length === 0">
            <td colspan="5" class="text-center text-gray-500 py-8">No hay proyectos registrados.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <button class="btn btn-circle btn-primary fixed bottom-6 right-6 text-white shadow-lg z-50" @click="openModal">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
    </button>

    <ProjectModal
      :show="modalVisible"
      :isEditing="isEditing"
      :project="selectedProject"
      @close="closeModal"
      @save="saveProject"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import { useProjectsStore } from '../stores/projectsStore'
import ProjectModal from '../components/ProjectModal.vue'

export default {
  components: { ProjectModal },
  setup() {
    const projectsStore = useProjectsStore()
    const modalVisible = ref(false)
    const isEditing = ref(false)
    const selectedProject = ref(null)

    function openModal() {
      isEditing.value = false
      selectedProject.value = null
      modalVisible.value = true
    }

    function closeModal() {
      modalVisible.value = false
      selectedProject.value = null
    }

    function editProject(project) {
      isEditing.value = true
      selectedProject.value = { ...project }
      modalVisible.value = true
    }

    function saveProject(project) {
      if (isEditing.value && project.id) {
        projectsStore.updateProject(project)
      } else {
        projectsStore.addProject(project)
      }
      closeModal()
    }

    return {
      projectsStore,
      modalVisible,
      isEditing,
      selectedProject,
      openModal,
      closeModal,
      editProject,
      saveProject
    }
  }
}
</script>
