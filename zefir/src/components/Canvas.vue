<script setup lang="ts">
import Modal from './Modal.vue';
import { onMounted, onUnmounted } from 'vue';
import { initGameLoop } from '../core/gameLoop'

let canvas: HTMLCanvasElement
onMounted(() => {
  canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
  window.addEventListener("resize", resizeCanvas)
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  const context = canvas.getContext("2d")
  if (context) {
  // Draw on the canvas
  initGameLoop()
}
})

onUnmounted(() => {
  window.removeEventListener("resize", resizeCanvas)
})

function resizeCanvas(event: any){
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

</script>

<template>
  <canvas id="myCanvas" class="h-full w-full"></canvas>
  <modal></modal>
  <modal></modal>
</template>

<style scoped>
canvas {
      border: 1px solid white;
    }
</style>
