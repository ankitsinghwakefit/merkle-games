<template>
  <div class="container">
    <h1>Games</h1>
    <div class="controls">
    <!-- Search box for games -->
    <input
      v-model="search"
      @input="onSearch"
      placeholder="Search games..."
    />

    <!-- Genre Filter for games -->
    <select v-model="selectedGenre" @change="onGenreChange">
      <option value="">All Genres</option>
      <option v-for="genre in genres" :key="genre.id" :value="genre.id">
        {{ genre.name }}
      </option>
    </select>

    <!-- Sort games -->
    <select v-model="sortBy">
      <option value="rating">Sort by Rating</option>
      <option value="date">Sort by Release Date</option>
    </select>
    </div>
    <!-- game card Grid -->
    <div class="grid">
      <GameCard v-for="game in sortedGames" :key="game.id" :game="game" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useGames } from '@/composables/useGames'
import { api } from '@/services/api'

const { games, fetchRandomGames, searchGames, getGamesByGenre } = useGames()

const search = ref('')
const selectedGenre = ref('')
const genres = ref<any[]>([])
const sortBy = ref('rating')

onMounted(async () => {
  fetchRandomGames()
  const allGenres = await api.getGenres()
  genres.value = allGenres.data
})

let timeout: any
const onSearch = () => {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    searchGames(search.value)
  }, 2000)
}

// on Genre change
const onGenreChange = () => {
  if (selectedGenre.value) {
  getGamesByGenre(Number(selectedGenre.value))
  }
}

const sortedGames = computed(() => {
  if (sortBy.value === 'rating') {
    return [...games.value].sort((a, b) => b.rating - a.rating)
  }
  return [...games.value].sort(
    (a, b) =>
      new Date(b.releaseDate).getTime() -
      new Date(a.releaseDate).getTime()
  )
})
</script>

<style scoped lang="scss">
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px;
}

h1 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #111827;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
}

input {
  flex: 1 1 250px;
  min-height: 42px;
  padding: 0 12px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  font-size: 14px;
  transition: border 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
  }
}

select {
  flex: 0 0 200px;
  min-height: 42px;
  padding: 0 10px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  font-size: 14px;
  cursor: pointer;

  transition: border 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
  }
}

.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

/* Card Wrapper */
.grid > * {
  flex: 1 1 calc(25% - 16px);
  max-width: calc(25% - 16px);
}

@media (max-width: 1024px) {
  .grid > * {
    flex: 1 1 calc(33.33% - 16px); /* 3 columns */
    max-width: calc(33.33% - 16px);
  }
}

@media (max-width: 768px) {
  .grid > * {
    flex: 1 1 calc(50% - 16px); /* 2 columns */
    max-width: calc(50% - 16px);
  }

  .controls {
    flex-direction: column;
  }

  select {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .grid > * {
    flex: 1 1 100%;
    max-width: 100%;
  }
}

body {
  background: linear-gradient(to bottom, #f9fafb, #f3f4f6);
}
</style>