<script setup lang="ts"></script>
<template>
  <div>
    <header>
      <slot name="header"> 默认页眉内容 </slot>
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>

<style scoped lang="scss"></style>
