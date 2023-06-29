<script setup lang="ts">
import { pushScopeId, reactive, ref } from 'vue';
import { sendMessage, getConnectionId } from '@/core/gameNetwork';

let dragging = ref(false)
let modalTop = ref(0)
let modalLeft = ref(0)
let mouseX = 0
let mouseY = 0
let initialModalTop = 0
let initialModalLeft = 0
const chatInput = ref("")
const chat: string[] = reactive([])

function startDrag(event: any) {
  dragging.value = true;
  mouseX = event.clientX;
  mouseY = event.clientY;
  initialModalTop = modalTop.value;
  initialModalLeft = modalLeft.value;
  window.addEventListener('mousemove', drag);
  window.addEventListener('mouseup', stopDrag);
}

function stopDrag() {
  dragging.value = false;
  window.removeEventListener('mousemove', drag);
  window.removeEventListener('mouseup', stopDrag);
}

function drag(event: any) {
  if (dragging) {
    const deltaX = event.clientX - mouseX;
    const deltaY = event.clientY - mouseY;
    modalTop.value = initialModalTop + deltaY;
    modalLeft.value = initialModalLeft + deltaX;
  }
}

function sendChat(message: string){
  console.log(message)
  sendMessage('message', message)
  chat.push(getConnectionId()+ ": "+message)
}

document.addEventListener('chatMessage', (event: Event) => {
  const customEvent = event as CustomEvent
  const data: any = customEvent.detail

  chat.push(data)
})

</script>

<template>
    <div class="modal-container" :style="{ top: modalTop + 'px', left: modalLeft + 'px' }">
      <div class="modal-header" @mouseup="stopDrag" @mousedown="startDrag">
        <h2>My Modal</h2>
      </div>
      <div class="modal-content">
        <div v-for="msg in chat">
          <p>
            {{ msg }}
          </p>
        </div>
        <input type="text" v-model="chatInput">
        <button @click="sendChat(chatInput)">Send</button>
      </div>
    </div>
  </template>
  
  <style scoped>
  .modal-container {
    position: absolute;
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 10px;
  }
  
  .modal-header {
    cursor: move;
    padding: 5px;
    background-color: #ccc;
    color: black;
  }
  
  .modal-content {
    padding: 10px;
    color: black;
  }
  </style>