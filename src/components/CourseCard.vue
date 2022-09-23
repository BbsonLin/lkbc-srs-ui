<script setup>
const props = defineProps({
  title: String,
  date: String,
  owner: String | Object,
  disable: {
    type: Boolean,
    default: false,
  },
  cancelable: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits({
  register(payload) {
    // console.log('register', payload)
  },
  unregister(payload) {
    // console.log('unregister', payload)
  },
})
</script>

<template>
  <div class="card card-bordered border-1 bg-base-200 shadow-sm w-[45%] md:w-[30%] lg:w-[23%]">
    <div class="card-body items-center text-center">
      <h2 class="card-title whitespace-pre-wrap">{{ title }}</h2>
      <p>{{ date }}</p>
      <p>{{ owner.name }}</p>
      <div class="card-actions justify-center">
        <button
          v-if="!cancelable"
          class="btn btn-primary"
          :class="{ 'btn-disabled': disable }"
          @click="$emit('register')"
        >
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

        <button
          v-else
          class="btn btn-primary"
          @click="$emit('unregister')"
        >
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
          Regret
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
