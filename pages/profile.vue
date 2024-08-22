<script setup lang="ts">
definePageMeta({
  middleware: [
    function (to, from) {
      // 自定义内联中间件
    },
    "mytest",
  ],
});
</script>
<template>
  <div></div>
</template>

<style scoped lang="scss"></style>
