<template>
  <div class="w-full">
    <div class="max-w-xl mx-auto">
      <div class="bg-white border transition-all hover:translate-y-1 hover:shadow-xl rounded-md z-10 p-24 m-6 mt-10">
        <div class="border p-5 rounded-md text-center text-4xl text-gray-700 font-light mb-10">
          Login
        </div>
        <div class="flex justify-center gap-1">
          Do not have an account?
          <router-link to="/registration">
            <span class="cursor-pointer text-blue-500 hover:underline hover:text-blue-700">Register now!</span>
          </router-link>
        </div>
        <div class="w-full flex justify-center p-3 rounded-md">
          <GoogleLogin :callback="callback" />
        </div>
        <div>
          <input disabled placeholder="Email" class="mb-2 border rounded-md outline-none w-full px-5 py-2"/>
          <input disabled placeholder="Password" class="border rounded-md outline-none w-full px-5 py-2"/>
        </div>
        <button disabled class="disabled:bg-gray-400 mt-8 w-full border py-2 px-4 rounded-md text-[18px] bg-blue-500 text-white hover:bg-blue-600 transition-all">Login</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { GoogleLogin } from "vue3-google-login";
  import { useUserStore } from "@/store/user.store";
  import { useRouter } from "vue-router";
  import type { AxiosResponse } from 'axios'

  const router = useRouter();
  const userStore = useUserStore();

  const callback = async (response: AxiosResponse) => {
    await userStore.getUserInfoFromGoogle(response);

    setTimeout(() => {
      router.push("/");
    }, 200);
  }
</script>