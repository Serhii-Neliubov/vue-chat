import { defineStore } from 'pinia'
import axios from "axios";
import {v4 as uuid} from 'uuid';
import {db} from "@/firebase-init";
import {doc, getDoc, setDoc} from "firebase/firestore";

axios.defaults.baseURL = 'http://localhost:4001/';

export const useUserStore = defineStore('user', {
  state: () => ({
    sub: '',
    email: '',
    picture: '',
    firstName: '',
    lastName: '',
  }),

  actions: {
    async getUserInfoFromGoogle(data: any) {
      try {
        let res = await axios.post('api/google-login', {
          token: data.credential
        })

        console.log(res.data);
        let userExists = await this.checkIfUserExists(res.data.sub);
        if (!userExists) await this.saveUserDetails(res);

        this.sub = res.data.sub;
        this.email = res.data.email;
        this.picture = res.data.picture;
        this.firstName = res.data.given_name;
        this.lastName = res.data.family_name;
      } catch (e) {
        console.log(e);
      }
    },

    async checkIfUserExists(id: string) {
      let docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef);

      return docSnap.exists();
    },

    async saveUserDetails(res: any) {
      try {
        console.log(res.data);
        const firstName = res.data.given_name || ''; // Provide a default value if given_name is undefined
        const lastName = res.data.family_name || ''; // Provide a default value if family_name is undefined

        await setDoc(doc(db, "users", res.data.sub), {
          sub: res.data.sub,
          email: res.data.email || '', // Provide a default value if email is undefined
          picture: res.data.picture || '', // Provide a default value if picture is undefined
          firstName: firstName,
          lastName: lastName,
        });
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

  persist: true,
})