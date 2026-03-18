<script setup>
import { GEM_COLORS } from '../utils/colors.js'

const props = defineProps({
  color: String,
  index: Number,
  prediction: Object
})

defineEmits(['click'])
</script>

<template>
  <div 
    class="gem-cell" 
    :class="{ 'is-predicted': !color && prediction, 'is-filled': color }"
    :style="{ 
      backgroundColor: color ? GEM_COLORS[color].hex : (prediction ? `${GEM_COLORS[prediction.color].hex}50` : 'rgba(255, 255, 255, 0.5)'),
    }"
    :title="color ? `${color} (${GEM_COLORS[color].symbol})` : ''"
    @click="$emit('click', index)"
  >
    <span v-if="color"></span>
    
    <span 
      v-else-if="prediction" 
      class="prediction-text"
      :style="{ color: GEM_COLORS[prediction.color].hex }"
    >
      {{ prediction.confidence }}%
    </span>
    
    <span v-else class="empty-number">{{ index + 1 }}</span>
  </div>
</template>

<style scoped>
.gem-cell {
  width: 100%;
  aspect-ratio: 1;
  clip-path: polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.gem-cell:hover {
  transform: scale(1.1) translateY(-4px);
  filter: brightness(1.1);
}

.is-predicted {
  animation: breathe 2s infinite alternate ease-in-out;
}

.is-filled {
  animation: pop-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

.prediction-text {
  font-size: 1.2rem;
  font-weight: 900;
  text-shadow: 0px 1px 3px rgba(0,0,0,0.3); 
}

.empty-number {
  font-size: 1.5rem;
  color: rgba(26, 43, 76, 0.3);
  font-weight: bold;
}

@keyframes breathe {
  0% { transform: scale(0.95); }
  100% { transform: scale(1.02); }
}

@keyframes pop-in {
  0% { transform: scale(0.5); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
</style>
