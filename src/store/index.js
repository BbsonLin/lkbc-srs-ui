import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    currentUser: null
  }),
  getters: {
    getCurrentUser(state) {
      return state.currentUser
    }
  },
  actions: {
    updateCurrentUser(user) {
      this.currentUser = user
    },
  }
})