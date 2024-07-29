import { HTTP } from '@app/http';

const gameActions = {
    methods: {
        startGame(child_or_group_id: number, id: number) {
            HTTP.post(`/answers/${child_or_group_id}/`, {
                task: id,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                }
            })
        },
        endGame(child_or_group_id: number, id: number) {
            HTTP.post(`/answers/${child_or_group_id}/${id}`, {
                is_correct: true
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                }
            })
        }
    }
};

export default gameActions;