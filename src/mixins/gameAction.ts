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
         getCorrectAnswer(id: number, childId: number, correctId: number) {
             answerStore.getAnswers(childId);
            const correctAnswer: Answer = answerStore.answers.filter((item: Answer) => item.task.id === id)[0];
            console.log('info', correctId, correctAnswer, correctAnswer.id);
            correctId = correctAnswer.id;
            console.log('info2', correctId, correctAnswer, correctAnswer.id);
            if (correctAnswer.is_started === false) {
                gameActions.methods.startGameRequest(childId, id)
            }
            return correctId;
        }
    }
};

export default gameActions;