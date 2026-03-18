<script setup>
import GemGrid from './components/GemGrid.vue'
</script>

<template>
  <main class="app-container">
    <header>
      <h1>HKIA Gem Match Tracker</h1>
    </header>
    <GemGrid />
  </main>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  min-height: 100vh;
  background-color: #2b1d3d;
  color: white;
  font-family: sans-serif;
}

header {
  margin-bottom: 2rem;
  text-align: center;
}

h1 {
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}
</style>
