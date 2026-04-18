export const api = {
  getRandomGameIds: () =>
    $fetch('http://localhost:8000/api/v1/games/by-date-range?from=2015-01-01&to=2017-12-31'),

  getGameById: (id: number) =>
    $fetch(`http://localhost:8000/api/v1/games/${id}`),

  searchGames: (query: string) =>
    $fetch(`http://localhost:8000/api/v1/games?search=${query}`),

  getGenres: () =>
    $fetch('http://localhost:8000/api/v1/genres'),

  getGamesByGenre: (genreId: number) =>
    $fetch(`http://localhost:8000/api/v1/genres/${genreId}`)
}