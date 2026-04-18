<template>
  <div class="container">
    <h1>Games</h1>

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
  // if (!selectedGenre.value) {
  //   fetchRandomGames()
  // } else {
  //   getGamesByGenre(Number(selectedGenre.value))
  // }
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