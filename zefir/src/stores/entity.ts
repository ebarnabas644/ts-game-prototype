import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Entity } from '@/core/entity/entity'

export const usePlayerStatStore = defineStore('playerStat', () => {
  const isLoading = ref(true)
  const players = ref<{[key: string]: Entity }>({})
  return { players, isLoading }
})