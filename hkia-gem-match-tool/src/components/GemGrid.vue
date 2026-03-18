<script setup>
import { ref } from 'vue'
import GemCell from './GemCell.vue'
import ColorPalette from './ColorPalette.vue'

const gridState = ref(Array(12).fill(null))
const activeCellIndex = ref(null)
const showPalette = ref(false)

const openPalette = (index) => {
  activeCellIndex.value = index
  showPalette.value = true
}

const selectColor = (colorName) => {
  if (activeCellIndex.value !== null) {
    gridState.value[activeCellIndex.value] = colorName
  }
  closePalette()
}

const closePalette = () => {
  showPalette.value = false
  activeCellIndex.value = null
}

const resetGrid = () => {
  gridState.value = Array(12).fill(null)
}
</script>

<template>
  <div class="grid-container">
    <div class="gem-grid">
      <GemCell 
        v-for="(color, index) in gridState" 
        :key="index"
        :index="index"
        :color="color"
        @click="openPalette"
      />
    </div>
    
    <button class="reset-btn" @click="resetGrid">Reset Board</button>

    <ColorPalette 
      v-if="showPalette" 
      @select="selectColor" 
      @close="closePalette" 
    />
  </div>
</template>

<style scoped>
.grid-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
}
.gem-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 1rem;
  width: 100%;
  max-width: 600px;
}
.reset-btn {
  padding: 0.75rem 1.5rem;
  background-color: transparent;
  color: white;
  border: 1px solid white;
  border-radius: 8px;
  cursor: pointer;
}
.reset-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
