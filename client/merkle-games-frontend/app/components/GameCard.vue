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
        ⭐ {{ game.rating }} <span>({{ game.ratingCount }})</span>
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
  border-radius: 16px;
  overflow: hidden;
  background: var(--card-bg);
  position: relative;

  display: flex;
  flex-direction: column;
  height: 100%;

  box-shadow:
    0 2px 6px rgba(0, 0, 0, 0.06),
    0 8px 20px rgba(0, 0, 0, 0.04);

  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-6px) scale(1.01);
    box-shadow:
      0 6px 16px rgba(0, 0, 0, 0.1),
      0 12px 28px rgba(0, 0, 0, 0.08);
  }

  &:focus {
    outline: 2px solid var(--primary);
    outline-offset: 3px;
  }
}

/* Image Section */
.image-wrapper {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: var(--border);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;

    transition: transform 0.4s ease;
  }

  .card:hover & img {
    transform: scale(1.08);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 40%,
      rgba(0, 0, 0, 0.4) 100%
    );
  }
}

.content {
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.title {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: var(--text);

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.game-date {
  font-size: 12px;
  color: var(--text-muted);
}

.rating {
  font-size: 14px;
  font-weight: 600;
  color: var(--rating);
  display: flex;
  align-items: center;
  gap: 4px;

  span {
    color: var(--text-soft);
    font-weight: 400;
    margin-left: 4px;
  }
}

.genre {
  align-self: flex-start;
  font-size: 12px;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 999px;

  background: #eef2ff;
  color: #4338ca;
}

.content::before {
  content: '';
  height: 1px;
  width: 100%;
  background: #f3f4f6;
  margin-bottom: 4px;
}

@media (max-width: 640px) {
  .image-wrapper {
    height: 160px;
  }

  .title {
    font-size: 15px;
  }
}
</style>