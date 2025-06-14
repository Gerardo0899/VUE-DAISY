import { defineStore } from 'pinia'

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: [
      { id: 1, name: 'Sistema de Gestión', tasks: [], progress: 0 },
      { id: 2, name: 'App Móvil', tasks: [], progress: 0 },
      { id: 3, name: 'Dashboard Analytics', tasks: [], progress: 0 }
    ]
  }),
  actions: {
    addProject(project) {
      project.id = Date.now()
      project.tasks = []
      project.progress = 0
      this.projects.push(project)
    },
    updateProject(updated) {
      const index = this.projects.findIndex(p => p.id === updated.id)
      if (index !== -1) this.projects[index] = { ...updated }
    },
    deleteProject(id) {
      this.projects = this.projects.filter(p => p.id !== id)
    },
    addTaskToProject(projectId, task) {
      const project = this.projects.find(p => p.id === projectId)
      if (project) {
        project.tasks.push(task)
        this.updateProgress(project)
      }
    },
    toggleTask(projectId, taskIndex) {
      const project = this.projects.find(p => p.id === projectId)
      if (project && project.tasks[taskIndex]) {
        project.tasks[taskIndex].done = !project.tasks[taskIndex].done
        this.updateProgress(project)
      }
    },
    updateProgress(project) {
      const total = project.tasks.length
      const completed = project.tasks.filter(t => t.done).length
      project.progress = total > 0 ? Math.round((completed / total) * 100) : 0
    }
  },
  getters: {
    projectsCount: (state) => state.projects.length,
    totalTasks: (state) =>
      state.projects.reduce((sum, p) => sum + (p.tasks?.length || 0), 0),

    getProjectById: (state) => (id) => {
      return state.projects.find(p => p.id === parseInt(id))
    },

    // ✅ Este getter calcula el progreso por ID de proyecto
    getProgress: (state) => (projectId) => {
      const project = state.projects.find(p => p.id === parseInt(projectId))
      if (!project || !project.tasks) return 0
      const done = project.tasks.filter(t => t.done).length
      return project.tasks.length > 0
        ? Math.round((done / project.tasks.length) * 100)
        : 0
    }
  }
})
