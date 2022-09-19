<script setup>
import { ref, onMounted } from 'vue'
import { onValue, update, ref as fireRef } from 'firebase/database'
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
} from 'firebase/auth'
import { db } from '@/firebase'
import CourseCard from '@/components/CourseCard.vue'

const provider = new GoogleAuthProvider()

const courses = ref([])
const openModal = ref(false)
const openLoginModal = ref(false)
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
    openLoginModal.value = true
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
const onLoginWithGoogle = () => {
  let auth = getAuth()
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      console.log('onLoginWithGoogle', result)
      if (auth.currentUser) {
        currentUser.value = auth.currentUser
      }
      // The signed-in user info.
      openLoginModal.value = false
    })
    .catch((error) => {
      console.log(error)
      // const credential = GoogleAuthProvider.credentialFromError(error)
    })
}

onMounted(async () => {
  const coursesRef = fireRef(db, 'courses/')
  onValue(coursesRef, (snapshot) => {
    console.log(snapshot)
    courses.value = snapshot.val()
    let auth = getAuth()
    console.log('onValue', auth)
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
      <CourseCard class="m-1" :title="course.title" :date="course.date" :owner="course.owner"
        :disable="course.owner != ''" @register="onRegister(course, id)"></CourseCard>
      <!-- <label for="my-modal" class="btn modal-button">open modal</label> -->
    </template>
  </div>

  <!-- Challenge Modal -->
  <input type="checkbox" class="modal-toggle" v-model="openModal" />
  <div class="modal">
    <div class="modal-box relative flex flex-col">
      <label class="btn btn-sm btn-circle absolute right-2 top-2"
        @click="onCloseModal">✕</label>
      <h3 class="font-bold text-lg">Accept this challenge?</h3>
      <div class="modal-action">
        <!-- <label class="btn" @click="onCloseModal">Nope</label> -->
        <label class="btn btn-primary" @click="onAccept">Yes !</label>
      </div>
    </div>
  </div>

  <!-- Login Modal -->
  <input type="checkbox" class="modal-toggle" v-model="openLoginModal" />
  <div class="modal">
    <div class="modal-box relative flex flex-col items-center">
      <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2"
        @click="openLoginModal = false">✕</label>
      <h1 class="text-lg">登入</h1>
      <button class="btn btn-wide" @click="onLoginWithGoogle">
        <svg aria-hidden="true" class="native svg-icon iconGoogle" width="18" height="18" viewBox="0 0 18 18">
          <path
            d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18Z"
            fill="#4285F4"></path>
          <path d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17Z"
            fill="#34A853"></path>
          <path d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07Z" fill="#FBBC05"></path>
          <path d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3Z"
            fill="#EA4335"></path>
        </svg>
        <p class="ml-1">Login with Google</p>
      </button>
    </div>
  </div>
</template>

<style>
</style>
