<script setup>
import { ref, onMounted } from 'vue'
import { onValue, update, ref as fireRef } from 'firebase/database'
import { getAuth } from 'firebase/auth'
import { db } from '@/firebase'
import CourseCard from '@/components/CourseCard.vue'

const courses = ref([])
const openModal = ref(false)
const selectedCourse = ref({})
const selectedCourseId = ref('')
const currentUser = ref(null)

const onRegister = (selCourse, selCourseId) => {
  // console.log('onRegister', selCourse, selCourseId)
  if (currentUser.value) {
    openModal.value = true
    selectedCourse.value = selCourse
    selectedCourseId.value = selCourseId
  } else {
    
  }
}
const onCloseModal = () => {
  openModal.value = false
}
const onAccept = () => {
  let auth = getAuth()
  if (currentUser.value) {
    // console.log('onAccept', currentUser.value)
    let update_data = {}
    update_data[`/courses/${selectedCourseId.value}`] = {
      ...selectedCourse.value,
      owner: {
        uid: currentUser.value.uid,
        name: currentUser.value.displayName,
        email: currentUser.value.email,
      },
    }
    // console.log('onAccept', update_data)
    update(fireRef(db), update_data)
    openModal.value = false
  } else {
    openModal.value = true
  }
}

onMounted(async () => {
  const coursesRef = fireRef(db, 'courses/')
  onValue(coursesRef, (snapshot) => {
    console.log(snapshot)
    courses.value = snapshot.val()
    let auth = getAuth()
    console.log(auth)
    if (auth.currentUser) {
      currentUser.value = auth.currentUser
    }
  })
})
</script>

<template>
  <!-- <h1 class="my-4 text-center text-2xl">2022 學青選課囉~</h1> -->
  <div class="flex flex-wrap justify-center">
    <template v-for="(course, id) in courses" :key="course.id">
      <CourseCard
        class="m-1"
        :title="course.title"
        :date="course.date"
        :owner="course.owner"
        :disable="course.owner != ''"
        @register="onRegister(course, id)"
      ></CourseCard>
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
