<template>
  <article
    class="card"
    role="button"
    tabindex="0"
    @click="goToDetail"
    @keydown.enter="goToDetail"
    @keydown.space.prevent="goToDetail"
    :aria-label="`View details for ${game.title}`"
  >
    <!-- game image -->
    <div class="image-wrapper">
      <img
        :src="imageSrc"
        :alt="game.title || 'Game image'"
        loading="lazy"
        @error="setFallback"
      />
    </div>

    <!-- game content details -->
    <div class="content">
      <h2 class="title">{{ game.title }}</h2>

      <p class="game-date">
        {{ formattedDate }}
      </p>

      <p
        class="rating"
        :aria-label="`Rating ${game.rating} out of 5 from ${game.ratingCount} reviews`"
      >
        ⭐ {{ game.rating }} ({{ game.ratingCount }})
      </p>

      <p class="genre">
        {{ game.genre }}
      </p>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Game } from '@/types/game'

const props = defineProps<{
  game: Game
}>()

const router = useRouter()

const goToDetail = () => {
  router.push(`/game/${props.game.id}`)
}

const imageSrc = ref(props.game.image)

const setFallback = () => {
  imageSrc.value = '/fallback.jpg'
}

const formattedDate = computed(() =>
  new Date(props.game.releaseDate).toLocaleDateString()
)
</script>

<style scoped lang="scss">
.card {
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  }

  &:focus {
    outline: 2px solid #6366f1;
    outline-offset: 2px;
  }
}

.image-wrapper {
  width: 100%;
  height: 180px;
  background: #e5e7eb;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.content {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.title {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: #111827;
}

.game-date {
  font-size: 13px;
  color: #4b5563;
}

.rating {
  font-size: 14px;
  font-weight: 500;
}

.genre {
  font-size: 13px;
  color: #374151;
}
</style>