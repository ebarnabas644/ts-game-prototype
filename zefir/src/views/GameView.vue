<script setup lang="ts">
import Canvas from '@/components/Canvas.vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePlayerStatStore } from '@/stores/entity'

const router = useRouter()
const playerStatStore = usePlayerStatStore()

onMounted(() => {
        if (!playerStatStore.isLoggedIn) {
                router.push('/')
        }
})
</script>

<template>
        <main>
                <Canvas />
        </main>
</template>
