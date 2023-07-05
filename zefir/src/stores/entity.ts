import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Entity } from '@/core/entity/entity'

export const usePlayerStatStore = defineStore('playerStat', () => {
  const isLoading = ref(true)
  const entities = ref<EntityDTODictionary>()
  const players = ref<{[key: string]: Entity }>({})
  return { players, entities, isLoading }
})