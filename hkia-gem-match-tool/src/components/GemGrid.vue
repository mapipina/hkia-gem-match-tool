<script setup>
import { ref, onMounted, watch } from 'vue'
import GemCell from './GemCell.vue'
import ColorPalette from './ColorPalette.vue'
import { saveWinningBoard, loadActiveBoard, saveActiveBoard, getAllWinningBoards } from '../utils/storage.js'
import { calculatePredictions } from '../utils/predictor.js' 

const gridState = ref(Array(12).fill(null))
const predictions = ref(Array(12).fill(null)) 
const historicalData = ref([])
const activeCellIndex = ref(null)
const showPalette = ref(false)

onMounted(async () => {
  gridState.value = loadActiveBoard()
  historicalData.value = await getAllWinningBoards() 
  runPredictions() 
})

watch(gridState, (newState) => {
  saveActiveBoard(newState)
  runPredictions() 
}, { deep: true })

const runPredictions = () => {
  if (historicalData.value.length > 0) {
    predictions.value = calculatePredictions(gridState.value, historicalData.value)
  }
}

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

const handleSaveWin = async () => {
  if (gridState.value.includes(null)) {
    alert("Please fill all 12 gems before saving!")
    return
  }
  
  try {
    await saveWinningBoard(gridState.value)
    alert("Winning pattern saved!")
    historicalData.value = await getAllWinningBoards() 
    resetGrid()
  } catch (err) {
    console.error(`Failed to save due to this error: ${err}`);
  }
}

// TEMPORARY SEED FUNCTION (Delete after running once)
/* const seedFakeData = async () => {
  const baseBoard = ['Red', 'Red', 'Yellow', 'Yellow', 'Sky Blue', 'Sky Blue', 'Purple', 'Purple', 'Green', 'Green', 'Green', 'Green']
  for (let i = 0; i < 50; i++) {
    let shuffled = [...baseBoard]
    for (let j = shuffled.length - 1; j > 0; j--) {
      const k = Math.floor(Math.random() * (j + 1))
      ;[shuffled[j], shuffled[k]] = [shuffled[k], shuffled[j]]
    }
    await saveWinningBoard(shuffled)
  }
  historicalData.value = await getAllWinningBoards()
  alert("Injected 50 fake games!")
} */
</script>

<template>
  <div class="app-viewport">
    
    <div class="grid-container">
      <div class="gem-grid">
        <GemCell 
          v-for="(color, index) in gridState" 
          :key="index"
          :index="index"
          :color="color"
          :prediction="predictions[index]" 
          @click="openPalette"
        />
      </div>
      <div class="button-group">
        <button class="reset-btn" @click="resetGrid">Reset Board</button>
        <button class="save-btn" @click="handleSaveWin">Save Game Pattern</button>
        <!-- <button class="reset-btn" @click="seedFakeData">Inject Fake Data</button> -->
      </div>
    </div>

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
  max-width: 600px;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 2.5rem;
  border-radius: 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.6);
}

.gem-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 0.75rem;
  width: 100%;
}

.button-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

button {
  padding: 0.85rem 1.5rem;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  font-weight: 800;
  font-size: 1rem;
  transition: all 0.2s;
  box-shadow: 0 4px 0 rgba(0,0,0,0.1);
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 0 rgba(0,0,0,0.1);
}

button:active {
  transform: translateY(4px);
  box-shadow: 0 0 0 rgba(0,0,0,0.1);
}

.reset-btn {
  background-color: white;
  color: #ff6b9e;
}

.save-btn {
  background-color: #1ed2af;
  color: white;
}
</style>

