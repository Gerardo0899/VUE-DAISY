<template>
  <div class="min-h-screen flex flex-col bg-base-200">
    <!-- Top bar -->
    <TopBar />

    <!-- Contenedor principal: sidebar + vista -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar -->
      <div class="w-64 bg-base-300 p-4">
        <SideBar/>
      </div>

      <!-- Vista principal (slot dinámico) -->
      <div class="flex-1 overflow-auto bg-base-100 p-6 relative">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TopBar from '../components/TopBar.vue'
import SideBar from '../components/SideBar.vue'
</script>
