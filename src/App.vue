<script setup>
import { ref } from "vue"
import Card from "@/components/Card.vue"

const courses = ref([
  {
    id: 1,
    date: '10/16',
    title: 'iBible1',
    owner: '',
  },
  {
    id: 2,
    date: '10/23',
    title: 'iBible2',
    owner: '',
  },
  {
    id: 1,
    date: '10/30',
    title: '慶生會',
    owner: '',
  }
])
const openModal = ref(false)
const selectedCourse = ref({})

const onRegister = (selCourse) => {
  openModal.value = true
  selectedCourse.value = selCourse
}
const onCloseModal = () => {
  console.log('onCloseModal', selectedCourse.value)
  openModal.value = false
}


</script>

<template>
  <h1 class="my-4 text-center text-2xl">2022 學青選課囉~</h1>
  <div class="flex flex-wrap justify-center">
    <template v-for="course in courses" :key="course.id">
      <Card class="m-2" :title="course.title" :date="course.date" @register="onRegister(course)"></Card>
      <!-- <label for="my-modal" class="btn modal-button">open modal</label> -->
    </template>
  </div>

  <!-- Modal -->
  <input type="checkbox" class="modal-toggle" v-model="openModal" />
  <div class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Accept this challenge?</h3>
      <div class="modal-action">
        <label class="btn" @click="onCloseModal">Yay!</label>
      </div>
    </div>
  </div>
</template>

<style>
</style>
