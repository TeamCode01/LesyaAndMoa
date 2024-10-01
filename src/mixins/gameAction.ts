import { useAnswerStore } from './../layouts/stores/answers';
import { HTTP } from '@app/http';
import type { Answer } from './../layouts/stores/answers';

// import { useRoute } from 'vue-router';
const answerStore = useAnswerStore();
const gameActions = {
    methods: {
        async startGameRequest(childId: number, id: number) {
            // const route = useRoute();
            await HTTP.post(`/answers/${childId}/`, {
                task: id,
            });
        },
        endGameRequest(childId: number, id: number) {
            // const route = useRoute();
            HTTP.put(`/answers/${childId}/${id}/`, {
                is_correct: true,
            });
        },
        async getCorrectAnswer(id: number, childId: number) {
            await answerStore.getAnswers(childId);

            if (answerStore.answers.length > 0) {
                let correctAnswer: Answer = answerStore.answers.filter(
                    (item: Answer) => item.task.id === id,
                )[0];
                gameActions.methods.startGameRequest(childId, id);
                if (correctAnswer) {
                    // gameActions.methods.startGameRequest(childId, id);

                    // localStorage.setItem('correctObj', String(correctAnswer));
                    let correctId = correctAnswer.id;
                    // localStorage.setItem('correctAnswer', String(correctId));
                    let is_correct = correctAnswer.is_correct;
                    return { correctId, is_correct };
                } else {
                    console.error(
                        'No correct answer found for the given task ID',
                    );
                }
            } else {

                let correctAnswer: Answer = answerStore.answers.filter(
                    (item: Answer) => item.task.id === id,
                )[0];
                if (correctAnswer) {
                    // gameActions.methods.startGameRequest(childId, id);

                    // localStorage.setItem('correctObj', String(correctAnswer));
                    let correctId = correctAnswer.id;
                    // localStorage.setItem('correctAnswer', String(correctId));
                    let is_correct = correctAnswer.is_correct;
                    let is_started = correctAnswer.is_started;
                    // localStorage.setItem('correct', String(is_correct))

                    if (is_started === false) {
                        gameActions.methods.startGameRequest(childId, id);
                    }
                    return { correctId, is_correct };
                } else {
                    gameActions.methods.startGameRequest(childId, id);
                    console.error(
                        'No correct answer found for the given task ID',
                    );
                }
            }
        },
    },
};

export default gameActions;
