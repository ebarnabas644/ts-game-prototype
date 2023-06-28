<template>
    <div class="modal-container" :style="{ top: modalTop + 'px', left: modalLeft + 'px' }" @mousedown="startDrag">
      <div class="modal-header" @mouseup="stopDrag">
        <h2>My Modal</h2>
      </div>
      <div class="modal-content">
        <!-- Modal content goes here -->
      </div>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    data() {
      return {
        dragging: false,
        modalTop: 0,
        modalLeft: 0,
        mouseX: 0,
        mouseY: 0,
        initialModalTop: 0,
        initialModalLeft: 0,
      };
    },
    methods: {
      startDrag(event: any) {
        this.dragging = true;
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
        this.initialModalTop = this.modalTop;
        this.initialModalLeft = this.modalLeft;
        window.addEventListener('mousemove', this.drag);
        window.addEventListener('mouseup', this.stopDrag);
      },
      stopDrag() {
        this.dragging = false;
        window.removeEventListener('mousemove', this.drag);
        window.removeEventListener('mouseup', this.stopDrag);
      },
      drag(event: any) {
        if (this.dragging) {
          const deltaX = event.clientX - this.mouseX;
          const deltaY = event.clientY - this.mouseY;
          this.modalTop = this.initialModalTop + deltaY;
          this.modalLeft = this.initialModalLeft + deltaX;
        }
      },
    },
  };
  </script>
  
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
  }
  
  .modal-content {
    padding: 10px;
  }
  </style>