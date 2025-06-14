<template>
    <div class="p-6">
        <!-- Título y botón de regreso -->
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold text-gray-800">
                Proyecto: {{ project?.name || 'No encontrado' }}
            </h1>
            <button @click="goBack" class="btn btn-sm btn-outline">← Volver</button>
        </div>

        <!-- Barra de progreso -->
        <div class="mb-4">
            <div class="w-full bg-gray-200 rounded-full h-3">
                <div class="bg-green-500 h-3 rounded-full transition-all duration-300" :style="`width: ${progress}%`">
                </div>
            </div>
            <p class="text-sm mt-2 text-gray-600">Progreso: {{ progress }}%</p>
        </div>

        <!-- Lista de tareas -->
        <ul class="space-y-2 mb-6">
            <li v-for="(task, index) in project.tasks" :key="index"
                class="bg-white p-3 rounded shadow flex items-center gap-3">
                <input type="checkbox" :checked="task.done" @change="toggleTask(index)" />
                <span :class="[
                    'text-black',
                    { 'line-through text-gray-400': task.done }
                ]">
                    {{ task.name }}
                </span>


            </li>
        </ul>

        <!-- Formulario para agregar tarea -->
        <form @submit.prevent="addTask" class="flex gap-2">
            <input v-model="newTask" type="text" placeholder="Nueva tarea" class="input input-bordered w-full" />
            <button type="submit" class="btn btn-primary">Agregar</button>
        </form>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProjectsStore } from '@/stores/projectsStore'

const route = useRoute()
const router = useRouter()
const projectsStore = useProjectsStore()

const projectId = parseInt(route.params.id)
const project = computed(() => projectsStore.getProjectById(projectId))

const newTask = ref('')

const progress = computed(() => project.value?.progress || 0)

function addTask() {
    if (newTask.value.trim() && project.value) {
        projectsStore.addTaskToProject(projectId, {
            name: newTask.value.trim(),
            done: false
        })
        newTask.value = ''
    }
}

function toggleTask(index) {
    projectsStore.toggleTask(projectId, index)
}

function goBack() {
    router.push('/')
}
</script>
