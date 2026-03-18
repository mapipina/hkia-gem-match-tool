<script setup>
import { ref, onMounted, watch } from 'vue'
import GemCell from './GemCell.vue'
import ColorPalette from './ColorPalette.vue'

const STORAGE_KEY = 'hkia-gem-match-board'

const gridState = ref(Array(12).fill(null))
const activeCellIndex = ref(null)
const showPalette = ref(false)

onMounted(() => {
  const savedData = localStorage.getItem(STORAGE_KEY)
  if (savedData) {
    try {
      gridState.value = JSON.parse(savedData)
    } catch (e) {
      console.error(`Could not parse local storage data bc of err: ${e}`)
    }
  }
})

watch(gridState, (newState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newState))
}, { deep: true })

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
