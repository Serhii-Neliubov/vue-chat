<template>
  <div v-if="isModalOpen" class="fixed w-full h-screen z-30 flex justify-center items-center">
    <div @click.stop="isModalOpen = false" class="absolute bg-black bg-opacity-70 w-full h-screen"/>
    <div class="p-[15px] relative z-10 text-center bg-white rounded-md">
      <h2 class="font-semibold">Are you sure want to logout?</h2>
      <button @click="logout" class="hover:bg-green-400 transition-all w-full mt-2 py-5 bg-green-300 rounded-md">Yes</button>
      <button @click="isModalOpen = false" class="hover:bg-red-400 transition-all w-full mt-2 py-5 bg-red-300 rounded-md">No</button>
    </div>
  </div>

  <div class="flex">
    <div id="Header" class="fixed w-[420px] z-10">

      <div class="bg-[#f0f0f0] w-full flex justify-between items-center px-3 py-2">
        <img class="rounded-full ml-1 w-10" :src="userStore.picture || ''" alt="image" />
        <div class="flex items-center justify-center">
          <AccountGroupIcon fill-color="#515151" class="mr-6" />
          <LogoutIcon @click="isModalOpen = true" fill-color="#515151" class="cursor-pointer" />
        </div>
      </div>

      <div id="Search" class="bg-white w-full px-2 border-b shadow-sm">
        <div class="px-1 m-2 bg-[#f0f0f0] flex items-center justify-center rounded-md">
          <MagnifyIcon fill-color="#515151" :size="18" class="ml-2" />
          <input
              @click="showFindFriends = !showFindFriends"
              type="text"
              class="appearance-none w-full bg-[#f0f0f0] py-1.5 px-2.5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-sm placeholder:text-gray-500"
              autocomplete="off"
              placeholder="Start a new chat"
          />
        </div>
      </div>
    </div>

    <div v-if="showFindFriends">
      <Chats class="mt-[100px]"/>
    </div>

    <div v-else>
      <FindFriends class="pt-28"/>
    </div>

    <div v-if="userDataForChat.length">
      <Message />
    </div>

    <div v-else>
      <div class="ml-[420px] fixed w-[calc(100vw-420px)] h-[100vh] bg-gray-100 text-center">
        <div class="grid h-screen place-items-center">
          <div>
            <div class="w-full flex items-center justify-center">
              <img :width="375" src="/w-web-not-loaded-chat.png" alt="image" />
            </div>

            <div class="text-[32px] text-gray-500 font-light mt-10">WhatsApp</div>
            <div class="text-[14px] text-gray-600 mt-2">
              <div>Send and receive messages without keeping your phone online.</div>
              <div>Use WhatsApp on up to 4 linked devices and 1 phone at the same time.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useUserStore } from "@/store/user.store";
  const userStore = useUserStore();
  import { onMounted, ref } from 'vue'

  import AccountGroupIcon from 'vue-material-design-icons/AccountGroup.vue';
  import MagnifyIcon from 'vue-material-design-icons/Magnify.vue';
  import LogoutIcon from "vue-material-design-icons/logout.vue";

  import Chats from '@/views/Chats.vue';
  import Message from './Message.vue';
  import FindFriends from "@/views/FindFriends.vue";
  import router from '@/router'
  import { storeToRefs } from 'pinia'

  const { showFindFriends, userDataForChat } = storeToRefs(userStore);

  let isModalOpen = ref(false);

  onMounted(() => {
    try{
      userStore.getAllUsers();
      userStore.getAllChatsByUser();
    } catch (error) {
      console.error(error);
    }
  });

  const logout = () => {
    isModalOpen.value = true;

    try {
      userStore.logout();
      router.push('/login');
    } catch (error) {
      console.error(error);
    }
  }
</script>
