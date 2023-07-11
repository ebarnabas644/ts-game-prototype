<script setup lang="ts">
import Modal from './Modal.vue';
import { usePlayerStatStore } from '@/stores/entity';

const playerStat = usePlayerStatStore()
</script>

<template>
    <Modal :default-x="0.1" :default-y="0.1" :modalwidth="100" :modalheight="100">
        <h2>{{ playerStat.controlledEntity?.name }}</h2>
        <h2>Health:{{ playerStat.controlledEntity?.health }}</h2>
    </Modal>
</template>