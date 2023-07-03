import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { playerHealth } from '@/core/entity/entity'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

export const usePlayerStatStore = defineStore('playerStat', () => {
  const health = ref([{health: {max: 100, current: 50}, mana: 10}, {health: {max: 100, current: 10}, mana: 10}, {health: {max: 120, current: 20}, mana: 10}])
  function decrease(value: number){
    health.value[0].health.current = value
  }
  return { health, decrease }
})