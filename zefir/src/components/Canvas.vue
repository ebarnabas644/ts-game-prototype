<script setup lang="ts">
import Chat from './Chat.vue'
import StatusBar from './StatusBar.vue'
import Minimap from './Minimap.vue'
</script>

<template>
        <div id="pixiContainer"></div>
        <Chat :defaultX="0.05" :defaultY="0.7"></Chat>
        <StatusBar :defaultX="0.05" :defaultY="0.05"></StatusBar>
        <Minimap :defaultX="0.9" :defaultY="0.05"></Minimap>
</template>

<style scoped></style>
