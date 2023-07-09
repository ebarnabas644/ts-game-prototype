<script setup lang="ts">
import Modal from './Modal.vue';
import { ref, type HTMLAttributes } from 'vue';
import { networkSystemComponent } from '@/core/gameMain';
import { reactive } from 'vue';

const chatInput = ref("")
const chatbox = ref<HTMLElement>()
const chat: string[] = reactive([])
const message = ref<HTMLElement>()

function sendChat(message: string){
  console.log(message)
  networkSystemComponent.sendMessage('message', message)
  chat.push(networkSystemComponent.getConnectionId()+ ": "+message)
  scrollToEnd()
}

function scrollToEnd(){
  setTimeout(() => {
    chatbox.value?.scrollTo({
    top: chatbox.value.scrollHeight,
    behavior: 'smooth'
  })
  }, 0)
}

document.addEventListener('chatMessage', (event: Event) => {
  const customEvent = event as CustomEvent
  const data: any = customEvent.detail

  chat.push(data)
  scrollToEnd()
})

</script>

<template>
    <Modal>
      <div ref="chatbox" class="flex-row p-1 bg-gray-900 bg-opacity-10 h-48 overflow-y-scroll overflow-x-hidden content-end">
        <div class="">
          <div v-for="msg in chat">
            <p ref="message" class="break-words">
              {{ msg }}
            </p>
          </div>
        </div>
      </div>
      <div class="flex justify-between bg-gray-900 bg-opacity-10 border-t-black border-t-[1px]">
        <input class="border-b-black bg-transparent focus:outline-none" type="text" v-model="chatInput">
        <button @click="sendChat(chatInput)">Send</button>
      </div>
    </Modal>
</template>