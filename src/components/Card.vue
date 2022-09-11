<script setup>
const props = defineProps({
  title: String,
  date: String,
  owner: String | Object,
})

const emits = defineEmits({
  register(payload) {
    console.log('register', payload)
  },
})
</script>

<template>
  <div class="card card-bordered border-2 bg-base-100 shadow-xl">
    <div class="card-body items-center text-center">
      <h2 class="card-title">{{ title }}</h2>
      <p>{{ date }}</p>
      <p v-if="owner != ''">{{ owner.name }}</p>
      <div class="card-actions justify-center">
        <button class="btn btn-primary" @click="$emit('register')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          Accept
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
