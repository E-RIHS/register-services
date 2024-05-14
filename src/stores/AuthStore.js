import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('AuthStore', () => {
    const accessToken = ref(null)
    const userId = ref(null)
    const username = ref(null)
    const groupIds = ref(null)
    return {
        accessToken,
        userId,
        username,
        groupIds
    }
})