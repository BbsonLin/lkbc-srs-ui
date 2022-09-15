<script setup>
import { ref, onMounted, reactive } from 'vue'
import { set, onValue, ref as fireRef } from 'firebase/database'
import { db } from '@/firebase'
import FlatCourseCard from '@/components/FlatCourseCard.vue'

const courses = ref([])
const openModal = ref(false)
const courseForm = reactive({
  date: '',
  title: '',
  owner: '',
})

const onEdit = (selCourse) => {
  // openModal.value = true
}
const onCloseModal = () => {
  openModal.value = false
  console.log(courseForm)
  let courseId = courseForm.date.replaceAll('-', '')
  console.log(courseId, courseForm)
  set(fireRef(db, `courses/${courseId}`), {
    date: courseForm.date,
    title: courseForm.title,
    owner: courseForm.owner,
  })
}

onMounted(async () => {
  const coursesRef = fireRef(db, 'courses/')
  onValue(coursesRef, (snapshot) => {
    courses.value = snapshot.val()
  })
})
</script>

<template>
  <!-- <h1 class="my-4 text-center text-2xl">2022</h1> -->
  <button class="btn btn-secondary" @click="openModal = true">新增</button>
  <template v-for="course in courses" :key="course.id">
    <FlatCourseCard
      class="m-2"
      :title="course.title"
      :date="course.date"
      @edit="onEdit(course)"
    ></FlatCourseCard>
  </template>

  <!-- Modal -->
  <input type="checkbox" class="modal-toggle" v-model="openModal" />
  <div class="modal">
    <div class="modal-box relative">
      <label
        for="my-modal-3"
        class="btn btn-sm btn-circle absolute right-2 top-2"
        @click="openModal = false"
        >✕</label
      >
      <h1 class="text-2xl">新增課程</h1>
      <div class="my-2">
        <label class="label">
          <span class="label-text">日期</span>
        </label>
        <input
          type="date"
          placeholder="2022/10/16"
          class="input input-bordered w-full max-w-xs"
          v-model="courseForm.date"
        />
      </div>
      <div class="my-2">
        <label class="label">
          <span class="label-text">活動名稱</span>
        </label>
        <input
          type="text"
          placeholder="iBible3"
          class="input input-bordered w-full max-w-xs"
          v-model="courseForm.title"
        />
      </div>
      <div class="modal-action">
        <label class="btn" @click="onCloseModal">Submit</label>
      </div>
    </div>
  </div>
</template>

<style scoped>
html[data-theme='dark'] input[type='date']::-webkit-calendar-picker-indicator {
  filter: invert(0.8);
}
</style>
