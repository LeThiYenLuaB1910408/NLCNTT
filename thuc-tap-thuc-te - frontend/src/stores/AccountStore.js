import { defineStore } from 'pinia';

export const useAccountStore = 
defineStore('accountId', {
    state: () => ({ user: {} }),
  })