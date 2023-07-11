import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { EntityDTODictionary } from '@/core/entity/entityDTO'
import { networkSystemComponent } from '@/core/gameMain'
import type { SimpleEntity } from '@/core/entity/simpleEntity'

export const usePlayerStatStore = defineStore('playerStat', () => {
  const isLoading = ref(true)
  const isLoggedIn = ref(false)
  const controlledEntity = computed(() => {
    return entities.value.find(entity => entity.tags['controlledby'] == networkSystemComponent.getConnectionId())
  })
  const entities = ref<EntityDTODictionary>([])
  const players = ref<{[key: string]: SimpleEntity }>({})
  return { players, entities, isLoading, controlledEntity, isLoggedIn }
})