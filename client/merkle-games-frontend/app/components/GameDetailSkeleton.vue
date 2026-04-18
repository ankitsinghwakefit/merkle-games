<template>
  <div class="skeleton">
    <div class="title"></div>
    <div class="image"></div>
    <div class="line"></div>
    <div class="line short"></div>
  </div>
</template>

<style scoped lang="scss">
.skeleton {
  .title {
    height: 24px;
    width: 60%;
    background: #e5e7eb;
    margin-bottom: 16px;
  }

  .image {
    height: 300px;
    background: #e5e7eb;
    margin-bottom: 16px;
  }

  .line {
    height: 12px;
    background: #e5e7eb;
    margin-bottom: 8px;

    &.short {
      width: 50%;
    }
  }
}
</style>