import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Entity } from '@/core/entity/entity'
import { networkSystemComponent } from '@/core/gameMain'

export const usePlayerStatStore = defineStore('playerStat', () => {
  const isLoading = ref(true)
  const controlledEntity = computed(() => {
    return entities.value['players'].find(entity => entity.tags['controlledby'] == networkSystemComponent.getConnectionId())
  })
  const entities = ref<EntityDTODictionary>({})
  const players = ref<{[key: string]: Entity }>({})
  return { players, entities, isLoading, controlledEntity }
})