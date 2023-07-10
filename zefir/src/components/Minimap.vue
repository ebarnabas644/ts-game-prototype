<script setup lang="ts">
import Modal from './Modal.vue';
import { usePlayerStatStore } from '@/stores/entity';

const playerStat = usePlayerStatStore()
</script>

<template>
    <Modal :default-x="0.8" :default-y="0.1" :modalwidth="100" :modalheight="100">
        <h2>X:{{ playerStat.controlledEntity?.position.x }}</h2>
        <h2>Y:{{ playerStat.controlledEntity?.position.y }}</h2>
    </Modal>
</template>