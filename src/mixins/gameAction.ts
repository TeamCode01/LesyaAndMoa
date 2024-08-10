import { useAnswerStore } from './../layouts/stores/answers';
import { HTTP } from '@app/http';
import type { Answer } from './../layouts/stores/answers';

// import { useRoute } from 'vue-router';
const answerStore = useAnswerStore();
const gameActions = {
    methods: {
        startGameRequest(childId: number, id: number) {
            // const route = useRoute();
            HTTP.post(`/answers/${childId}/`, {
                task: id,
            })
        },
        endGameRequest(childId: number, id: number) {
            // const route = useRoute();
            HTTP.put(`/answers/${childId}/${id}/`, {
                is_correct: true
            })
        },
        getCorrectAnswer(id: number, childId: number) {
            answerStore.getAnswers(childId);
            let correctAnswer: Answer = answerStore.answers.filter((item: Answer) => item.task.id === id)[0];
                gameActions.methods.startGameRequest(childId, id);
            let correctId = correctAnswer.id;
            let is_correct = correctAnswer.is_correct;
            let is_started = correctAnswer.is_started;

            return { correctId, is_correct, is_started };
        }
    }
};

export default gameActions;