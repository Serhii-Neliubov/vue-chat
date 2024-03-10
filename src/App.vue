<script setup lang="ts">
  import { RouterView } from 'vue-router'

  import { useUserStore } from "@/store/user.store";
  import { useRouter } from "vue-router";
  import {onMounted} from "vue";

  const router = useRouter();
  const userStore = useUserStore();

  onMounted(() => {
    if(!userStore.sub) router.push("/login");
  });
</script>

<template>
  <RouterView />
</template>