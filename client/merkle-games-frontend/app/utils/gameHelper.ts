const calculateAverage = (reviews: any[] = []) => {
  if (!reviews.length) return 0

  const total = reviews.reduce((sum, r) => sum + r.rating, 0)
  return (total / reviews.length).toFixed(1)
}
const getCoverImage = (images: any[] = []) => {
  const cover = images.find(img => img.image_type === 'Cover')
  return cover?.image_url
    ? `http://localhost:8000${cover.image_url}`
    : '/fallback.jpg'
}

export const normalizeGame = (data: any) => {
  return {
    id: data.id,
    title: data.title,
    releaseDate: data.release_date,
    genre: data.genre?.name,
    rating: calculateAverage(data.reviews),
    ratingCount: data.reviews?.length || 0,
    image: getCoverImage(data.images)
  }
}