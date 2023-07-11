<script setup lang="ts">
import { ref } from 'vue';
import { networkSystemComponent } from '@/core/gameMain';
import { useRouter } from 'vue-router';
import { emitCustomEvent } from '@/core/utilities/customEventEmitter';
import { usePlayerStatStore } from '@/stores/entity';

const nameInput = ref("")
const router = useRouter()
const playerStatStore = usePlayerStatStore()

function sendLoginName(name: string){
  networkSystemComponent.sendConnectionRequest(name)
  emitCustomEvent('startGame', '')
  playerStatStore.isLoggedIn = true
  router.push('/game')
}

</script>

<template>
  <div>
    <br>
    Enter your name:
    <input class="text-black" type="text" v-model="nameInput">
    <br>
    <button class="border-white" @click="sendLoginName(nameInput)">Play!</button>
  </div>
</template>

<style>
</style>
