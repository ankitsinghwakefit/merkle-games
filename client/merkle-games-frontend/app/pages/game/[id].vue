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

const setFallback = (e: Event) => {
  ;(e.target as HTMLImageElement).src = '/fallback.jpg'
}
</script>

<style scoped lang="scss">
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px 16px 40px;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;

  margin-bottom: 20px;
  padding: 8px 14px;

  border-radius: 999px;
  border: 1px solid #e5e7eb;
  background: #ffffff;

  font-size: 14px;
  cursor: pointer;

  transition: all 0.2s ease;

  &:hover {
    background: #f3f4f6;
  }

  &:focus {
    outline: 2px solid #6366f1;
    outline-offset: 2px;
  }
}

.details {
  background: #ffffff;
  border-radius: 18px;
  padding: 20px;

  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.06),
    0 10px 30px rgba(0, 0, 0, 0.05);
}

.details h1 {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #111827;
}

.details img {
  width: 100%;
  height: 360px;
  object-fit: cover;
  border-radius: 14px;
  margin-bottom: 18px;

  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.description {
  font-size: 15px;
  line-height: 1.6;
  color: #374151;
  margin-bottom: 18px;
}

.game-details {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 20px;

  padding: 14px;
  border-radius: 12px;
  background: #f9fafb;

  margin-bottom: 24px;

  p {
    font-size: 14px;
    color: #374151;
  }

  strong {
    color: #111827;
  }
}

.game-details p:nth-child(2) {
  color: #f59e0b;
  font-weight: 600;
}

.reviews {
  margin-top: 10px;
}

.reviews h2 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 14px;
  color: #111827;
}

/* Review Card */
.review {
  padding: 14px;
  border-radius: 12px;
  background: #ffffff;

  border: 1px solid #f1f5f9;
  margin-bottom: 12px;

  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
  }
}

.user {
  font-weight: 600;
  margin-bottom: 6px;
  color: #111827;
}

.review p:last-child {
  margin-top: 6px;
  font-weight: 500;
  color: #f59e0b;
}

@media (max-width: 768px) {
  .details img {
    height: 240px;
  }

  .details h1 {
    font-size: 22px;
  }
}

body {
  background: linear-gradient(to bottom, #f9fafb, #f3f4f6);
}
</style>