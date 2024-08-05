import { defineStore } from 'pinia';
import { HTTP } from '@app/http';

export const useAnswerStore = defineStore('answers', {
  state: () => ({
    answers: []
  }),
  actions: {
    async getAnswers(id: number) {
      try {
        const response = await HTTP.get(`answers/${id}/`);
        this.answers = response.data;
      } catch (error) {
        console.log('an error occured ' + error);
      }
    },
  },
});
