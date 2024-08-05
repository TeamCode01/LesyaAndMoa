import { HTTP } from '@app/http';
// import { useRoute } from 'vue-router';

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
    }
};

export default gameActions;