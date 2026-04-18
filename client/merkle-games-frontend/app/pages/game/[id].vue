<template>
  <main class="container">
    <button
      class="back-btn"
      @click="$router.back()"
      aria-label="Go back to games list"
    >
      ← Back
    </button>

    <!-- Loading Skeleton -->
    <GameDetailSkeleton v-if="pending" />

    <!-- Error -->
    <div v-else-if="error" role="alert">
      Failed to load game details
    </div>

    <!-- game content -->
    <article v-else class="details">
      <h1>{{ game.title }}</h1>

      <img
        :src="image"
        :alt="game.title"
        @error="setFallback"
      />

      <p class="description">{{ game.description }}</p>

      <div class="game-details">
        <p><strong>Release:</strong> {{ formattedDate }}</p>
        <p :aria-label="`Rating ${rating} out of 5`">
          <strong>Rating:</strong> ⭐ {{ rating }} ({{ ratingCount }})
        </p>
        <p><strong>Developer:</strong> {{ game.developer?.name }}</p>
        <p><strong>Genre:</strong> {{ game.genre?.name }}</p>
      </div>

      <!-- game reviews -->
      <section class="reviews">
        <h2>Reviews</h2>

        <div
          v-for="review in game.reviews"
          :key="review.id"
          class="review"
        >
          <p class="user">{{ review.user.username }}</p>
          <p>{{ review.review_text }}</p>
          <p>⭐ {{ review.rating }}</p>
        </div>
      </section>
    </article>
  </main>
</template>

<script setup lang="ts">
import { api } from '@/services/api'
import { calculateAverage, getCoverImage } from '@/utils/gameHelper'

const route = useRoute()

const { data, pending, error } = await useAsyncData(
  `game-${route.params.id}`,
  () => api.getGameById(route.params.id as string)
)

const game = computed(() => data.value?.data)

const image = computed(() => {
    return getCoverImage(game.value?.images)
})

const rating = computed(() => {
    return calculateAverage(game.value?.reviews)
})

const ratingCount = computed(() => game.value?.reviews?.length || 0)

const formattedDate = computed(() =>
  game.value
    ? new Date(game.value.release_date).toLocaleDateString()
    : ''
)

// 🖼️ Fallback
const setFallback = (e: Event) => {
  ;(e.target as HTMLImageElement).src = '/fallback.jpg'
}
</script>

<style scoped lang="scss">
.container {
  padding: 20px;
}

.back-btn {
  margin-bottom: 16px;
}

.details {
  max-width: 800px;
  margin: auto;

  img {
    width: 100%;
    border-radius: 12px;
    margin-bottom: 16px;
  }
}

.game-details {
  margin: 16px 0;
}

.reviews {
  margin-top: 24px;
}

.review {
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
}

.user {
  font-weight: bold;
}
</style>