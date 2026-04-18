import {ref} from 'vue'
import { api } from '@/services/api'
import { normalizeGame } from '@/utils/gameHelper' 

export const useGames = () => {
  const games = ref<any[]>([])
  const loading = ref(false)
  const error = ref(null)

  // fetch full game details from IDs
  const fetchGamesByIds = async (ids: number[]) => {
    const gameRequests = ids.map(id => api.getGameById(id))
    const gamesData = await Promise.all(gameRequests)
    return gamesData.map((item: any) => normalizeGame(item.data))
  }

  // INITIAL LOAD to get 15 random games 
  const fetchRandomGames = async () => {
    loading.value = true
    try {
      const randomGameIds: any = await api.getRandomGameIds()
      const randomGamesData = randomGameIds.ids.sort(() => 0.5 - Math.random()).slice(0, 15);
      games.value = await fetchGamesByIds(randomGamesData)
    } finally {
      loading.value = false
    }
  }

  // search games by query string
  const searchGames = async (query: string) => {
    if (!query) return fetchRandomGames()

    loading.value = true
    try {
      const queryGames: any = await api.searchGames(query)

      const ids = queryGames.data.map((game: any) => game.id)
      games.value = await fetchGamesByIds(ids)
    } finally {
      loading.value = false
    }
  }

  // get games by GENRE
  const getGamesByGenre = async (genreId: number) => {
    loading.value = true
    try {
      const gamesByGenre: any = await api.getGamesByGenre(genreId)

      const ids = gamesByGenre.data.games.map((game: any) => game.id)
      games.value = await fetchGamesByIds(ids.slice(0, 15))
    } finally {
      loading.value = false
    }
  }

  return {
    games,
    loading,
    error,
    fetchRandomGames,
    searchGames,
    getGamesByGenre
  }
}