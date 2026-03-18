<script setup>
const props = defineProps({
  color: String,
  index: Number
})

defineEmits(['click'])

const colorMap = {
  'Red': '#ff4d4d',
  'Yellow': '#ffd700',
  'Sky Blue': '#87ceeb',
  'Green': '#4caf50',
  'Purple': '#9c27b0',
}
</script>

<template>
  <div 
    class="gem-cell" 
    :style="{ 
      backgroundColor: colorMap[color] || 'rgba(255, 255, 255, 0.05)',
      borderColor: colorMap[color] || 'rgba(255, 255, 255, 0.2)',
      boxShadow: color ? `0 0 15px ${colorMap[color]}` : 'none'
    }"
    @click="$emit('click', index)"
  >
    <span v-if="!color">{{ index + 1 }}</span>
  </div>
</template>

<style scoped>
.gem-cell {
  width: 100%;
  aspect-ratio: 1;
  border: 2px dashed;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.2s ease;
}
.gem-cell:hover {
  transform: scale(1.05);
}
</style>
