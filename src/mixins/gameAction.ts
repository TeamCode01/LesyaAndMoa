
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
            gameActions.methods.startGameRequest(childId, id);
            let correctAnswer: Answer = answerStore.answers.filter((item: Answer) => item.task.id === id)[0];
            let correctId = correctAnswer.id;
            let is_correct = correctAnswer.is_correct;
            let is_started = correctAnswer.is_started;
            if (is_started === false) {
                gameActions.methods.startGameRequest(childId, id);
            }
            return { correctId, is_correct };
        }
    }
};

export default gameActions;