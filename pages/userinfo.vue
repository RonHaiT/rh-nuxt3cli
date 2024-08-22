<script setup lang="ts">
import { getUserList } from "~/api/news";
const login = async () => {
  let res = await getUserList();
  console.log(111, res.data);
};
</script>
<template>
  <div>
    <a-button type="primary" @click="login">获取用户信息</a-button>
  </div>
</template>

<style scoped lang="scss"></style>
