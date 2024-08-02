import { HTTP } from '@app/http';
import { useRoute } from 'vue-router';

const gameActions = {
    methods: {
        startGameReuest( id: number) {
            const route = useRoute();
            HTTP.post(`/answers/${route.params.idChildOrGroup}/`, {
                task: id,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                }
            })
        },
        endGameReuest(id: number) {
            const route = useRoute();
            HTTP.put(`/answers/${route.params.idChildOrGroup}/${id}/`, {
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