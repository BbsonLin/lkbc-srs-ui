<script setup>
import { ref, onMounted } from 'vue'
import { onValue, update, ref as fireRef } from 'firebase/database'
import { getAuth } from 'firebase/auth'
import { db } from '@/firebase'
import Card from '@/components/Card.vue'

const courses = ref([])
const openModal = ref(false)
const selectedCourse = ref({})
const selectedCourseId = ref('')

const onRegister = (selCourse, selCourseId) => {
  // console.log('onRegister', selCourse, selCourseId)
  openModal.value = true
  selectedCourse.value = selCourse
  selectedCourseId.value = selCourseId
}
const onCloseModal = () => {
  openModal.value = false
}
const onAccept = () => {
  let auth = getAuth()
  if (auth.currentUser) {
    // console.log('onAccept', auth.currentUser)
    let update_data = {}
    update_data[`/courses/${selectedCourseId.value}`] = {
      ...selectedCourse.value,
      owner: {
        uid: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
      },
    }
    // console.log('onAccept', update_data)
    update(fireRef(db), update_data)
    openModal.value = false
  } else {
  }
}

onMounted(async () => {
  const coursesRef = fireRef(db, 'courses/')
  onValue(coursesRef, (snapshot) => {
    courses.value = snapshot.val()
  })
})
</script>

<template>
  <!-- <h1 class="my-4 text-center text-2xl">2022 學青選課囉~</h1> -->
  <div class="flex flex-wrap justify-center">
    <template v-for="(course, id) in courses" :key="course.id">
      <Card
        class="m-1"
        :title="course.title"
        :date="course.date"
        :owner="course.owner"
        @register="onRegister(course, id)"
      ></Card>
      <!-- <label for="my-modal" class="btn modal-button">open modal</label> -->
    </template>
  </div>

  <!-- Modal -->
  <input type="checkbox" class="modal-toggle" v-model="openModal" />
  <div class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Accept this challenge?</h3>
      <div class="modal-action">
        <label class="btn" @click="onCloseModal">Nope</label>
        <label class="btn" @click="onAccept">Yay!</label>
      </div>
    </div>
  </div>
</template>

<style></style>
