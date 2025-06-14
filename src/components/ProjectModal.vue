<template>
  <dialog id="project_modal" class="modal">
    <div class="modal-box w-11/12 max-w-md">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>

      <h3 class="text-lg font-bold mb-4">
        {{ isEditing ? 'Editar Proyecto' : 'Nuevo Proyecto' }}
      </h3>

      <form @submit.prevent="submitForm" class="space-y-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Nombre del proyecto</span>
          </label>
          <input 
            type="text" 
            placeholder="Ingresa el nombre del proyecto" 
            class="input input-bordered w-full" 
            v-model="localForm.name"
            required
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Número de tareas</span>
          </label>
          <input 
            type="number" 
            placeholder="0" 
            class="input input-bordered w-full" 
            v-model.number="localForm.tasks"
            min="0"
            required
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Avance (%)</span>
          </label>
          <input 
            type="number" 
            placeholder="0" 
            class="input input-bordered w-full" 
            v-model.number="localForm.progress"
            min="0"
            max="100"
            required
          />
        </div>

        <div class="modal-action">
          <button type="button" class="btn btn-outline" @click="handleClose">
            Cancelar
          </button>
          <button type="submit" class="btn btn-primary" :disabled="!isFormValid">
            {{ isEditing ? 'Actualizar' : 'Guardar' }}
          </button>
        </div>
      </form>
    </div>

    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'

interface Project {
  id?: number
  name: string
  tasks: number
  progress: number
}

const props = defineProps<{
  show: boolean
  isEditing: boolean
  project: Project | null
}>()

const emit = defineEmits(['close', 'save'])

const localForm = ref<Project>({
  name: '',
  tasks: 0,
  progress: 0
})

watch(
  () => props.project,
  (newProject) => {
    localForm.value = newProject
      ? { ...newProject }
      : { name: '', tasks: 0, progress: 0 }
  },
  { immediate: true }
)

watch(
  () => props.show,
  (val) => {
    const modal = document.getElementById('project_modal') as HTMLDialogElement
    if (modal) {
      if (val) modal.showModal()
      else modal.close()
    }
  }
)

const isFormValid = computed(() => {
  const f = localForm.value
  return f.name.trim() !== '' && f.tasks > 0 && f.progress >= 0 && f.progress <= 100
})

function submitForm() {
  if (isFormValid.value) {
    emit('save', { ...localForm.value })
  }
}

function handleClose() {
  emit('close')
}
</script>

