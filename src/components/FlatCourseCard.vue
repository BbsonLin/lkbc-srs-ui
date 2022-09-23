<script setup>
const props = defineProps({
  title: String,
  date: String,
  owner: String | Object,
})

const emits = defineEmits(['edit', 'reset'])
</script>

<template>
  <div class="card card-bordered card-compact bg-base-100 shadow-xl md:w-[80%]">
    <div class="card-body flex-row justify-between">
      <div class="flex items-center">
        <h2 class="card-title mr-2">{{ title }}</h2>
        <p class="mr-2">{{ date }}</p>
        <p>{{ owner.name }}</p>
      </div>
      <div class="card-actions justify-center">
        <button class="btn" @click="$emit('reset')">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
          </svg>
        </button>
        <button class="btn p-3" @click="$emit('edit')">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
