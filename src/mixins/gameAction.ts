import { useAnswerStore } from './../layouts/stores/answers';
import { HTTP } from '@app/http';
import type { Answer } from './../layouts/stores/answers';

const answerStore = useAnswerStore();
const gameActions = {
    methods: {
        async startGameRequest(childId: number, id: number) {
            await HTTP.post(`/answers/${childId}/`, {
                task: id,
            });
        },
        endGameRequest(childId: number, id: number) {
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
                if (correctAnswer) {
                    let correctId = correctAnswer.id;
                    let is_correct = correctAnswer.is_correct;
                    return { correctId, is_correct };
                } else {
                    console.error(
                        'No correct answer found for the given task ID',
                    );
                    await gameActions.methods.startGameRequest(childId, id);
                    await answerStore.getAnswers(childId);

                    let correctAnswer: Answer = answerStore.answers.filter(
                        (item: Answer) => item.task.id === id,
                    )[0];
                    if (correctAnswer) {
                        let correctId = correctAnswer.id;
                        let is_correct = correctAnswer.is_correct;
                        return { correctId, is_correct };
                    }
                }
            } else {
                console.error('No answers found for the given child ID');
                await gameActions.methods.startGameRequest(childId, id);
                await answerStore.getAnswers(childId);

                let correctAnswer: Answer = answerStore.answers.filter(
                    (item: Answer) => item.task.id === id,
                )[0];
                if (correctAnswer) {
                    let correctId = correctAnswer.id;
                    let is_correct = correctAnswer.is_correct;
                    return { correctId, is_correct };
                }
            }
        },
    },
};

export default gameActions;
