<script setup>
import { onMounted, ref } from "vue"
import { useRoute, useRouter } from 'vue-router'
import { useColorMode, usePreferredColorScheme } from '@vueuse/core'
import { GoogleAuthProvider, signInWithPopup, getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from "@/firebase"

const mode = useColorMode({
  attribute: 'data-theme',
  modes: {
    // custom colors
    light: 'light',
    dark: 'dark',
  },
})
const route = useRoute()
const router = useRouter()
const provider = new GoogleAuthProvider()

const theme = ref('dark')
const openLoginModal = ref(false)
const photoUrl = ref('')

const onChangeTheme = (el) => {
  if (theme.value == 'dark') {
    theme.value = 'light'
    mode.value = 'light'
  } else {
    theme.value = 'dark'
    mode.value = 'dark'
  }
}
const onGoHome = () => {
  router.push('/')
}
const onLoginWithGoogle = () => {
  signInWithPopup(getAuth(), provider).then((result) => {
    // This gives you a Google Access Token. You can use it to access Google APIs.
    console.log(result)
    const credential = GoogleAuthProvider.credentialFromResult(result)
    const token = credential.accessToken

    // The signed-in user info.
    const user = result.user
    console.log(token, user)
    photoUrl.value = user.photoURL
    openLoginModal.value = false
  }).catch((error) => {
    console.log(error)
    // Handle Errors here.
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // The email of the user's account used.
    // const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error)
  });
}
const onLogout = () => {
  signOut(getAuth())
  router.go('/')
}

onMounted(() => {
  onAuthStateChanged(getAuth(), (user) => {
    // console.log(user)
    if (user) {
      photoUrl.value = user.photoURL
    }
  })
  const preferredColor = usePreferredColorScheme()
  mode.value = preferredColor.value
})
</script>

<template>
  <div class="navbar bg-base-100">
    <div class="navbar-start">
      <a class="btn btn-ghost normal-case text-xl" v-if="route.name != 'Home'" @click="onGoHome">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      </a>
      <!-- Theme button -->
      <label class="btn btn-ghost swap swap-rotate">
        <input type="checkbox" @change="onChangeTheme" />
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="swap-on fill-current w-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="swap-off fill-current w-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>
      </label>
    </div>
    <div class="navbar-center">
      <h1 class="text-2xl text-center">{{ route.meta.title }}</h1>
    </div>
    <div class="navbar-end">
      <!--  -->
      <button class="btn btn-ghost" @click="openLoginModal = true" v-if="photoUrl == ''">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
        </svg>
      </button>
      <!--  -->
      <div class="dropdown dropdown-end" v-else>
        <label tabindex="0" class="btn btn-md btn-circle btn-ghost m-1">
          <div class="avatar">
            <div class="w-8 rounded-full">
              <img :src="photoUrl" />
            </div>
          </div>
        </label>
        <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-24">
          <li><a @click="onLogout">Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
  <router-view></router-view>

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
