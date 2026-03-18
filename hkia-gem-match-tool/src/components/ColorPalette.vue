<script setup>
defineEmits(['select', 'close'])

const colors = [
  { name: 'Red', hex: '#ff4d4d' },
  { name: 'Yellow', hex: '#ffd700' },
  { name: 'Sky Blue', hex: '#87ceeb' },
  { name: 'Green', hex: '#4caf50' },
  { name: 'Purple', hex: '#9c27b0' },
  { name: null, hex: '#333', label: 'Clear' }
]
</script>

<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <h3>Select Gem Color</h3>
      <div class="color-grid">
        <button 
          v-for="color in colors" 
          :key="color.name"
          class="color-btn"
          :style="{ backgroundColor: color.hex }"
          @click="$emit('select', color.name)"
        >
          {{ color.label || color.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}
.modal-content {
  background: #2b1d3d;
  padding: 2rem;
  border-radius: 12px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  text-align: center;
}
.color-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1rem;
}
.color-btn {
  padding: 1rem;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  text-shadow: 0 1px 2px rgba(0,0,0,0.8);
}
</style>
