import { HTTP } from '@app/http';

const gameActions = {
    methods: {
        startGame(child_or_group_id: number, id: number) {
            HTTP.post(`/answers/${child_or_group_id}/`, {
                task: id,
            })
        },
        endGame(child_or_group_id: number, id: number) {
            HTTP.post(`/answers/${child_or_group_id}/${id}`, {
                is_correct: true
            })
        }
    }
};

export default gameActions;