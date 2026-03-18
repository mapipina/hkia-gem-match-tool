<script setup>
import { GEM_COLORS } from '../utils/colors.js'

defineEmits(['select', 'close'])

const colorNames = Object.keys(GEM_COLORS)
</script>

<template>
  <div class="palette-overlay" @click.self="$emit('close')">
    <div class="palette-card">
      <h3>Select Gem Color</h3>
      <div class="color-options">
        <button 
          v-for="name in colorNames" 
          :key="name"
          class="color-btn"
          :style="{ backgroundColor: GEM_COLORS[name].hex }"
          @click="$emit('select', name)"
          :title="`${name} (${GEM_COLORS[name].symbol})`"
        ></button>
      </div>
      <button class="cancel-btn" @click="$emit('close')">Cancel</button>
    </div>
  </div>
</template>

<style scoped>
.palette-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(26, 43, 76, 0.4);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: fade-in 0.2s ease-out;
}

.palette-card {
  background: white;
  padding: 2rem;
  border-radius: 32px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 90%;
  max-width: 400px;
  animation: scale-up 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

h3 {
  margin: 0 0 1.5rem 0;
  color: #1a2b4c;
}

.color-options {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.color-btn {
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.2s;
  box-shadow: 0 4px 0 rgba(0,0,0,0.1);
}

.color-btn:hover {
  transform: scale(1.1) translateY(-3px);
}

.cancel-btn {
  background: #f0f2f5;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 100px;
  color: #65676b;
  font-weight: bold;
  cursor: pointer;
}

@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes scale-up { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
</style>
