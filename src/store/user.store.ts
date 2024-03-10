import { defineStore } from 'pinia'
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:4001/';

export const useUserStore = defineStore('user', {
  // could also be defined as
  state: () => ({
    sub: '',
    email: '',
    picture: '',
    firstName: '',
    lastName: '',
  }),
  actions: {
    async getUserInfoFromGoogle(data) {
      try{
        let res = await axios.post('api/google-login', {
          token: data.credential
        })

        this.sub = res.data.sub;
        this.email = res.data.email;
        this.picture = res.data.picture;
        this.firstName = res.data.firstName;
        this.lastName = res.data.lastName;
      } catch (e) {
        console.log(e);
      }
    },

    async logout() {
      this.sub = '';
      this.email = '';
      this.picture = '';
      this.firstName = '';
      this.lastName = '';
    }
  },
})