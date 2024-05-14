import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useMessageStore = defineStore('MessageStore', () => {
    const list = reactive([])
    return {
        list
    }
})