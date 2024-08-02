<template>
    <div class="profile__wrapper" v-if="!userStore.children.length">
        <p class="text text__profile">Спасибо за регистрацию!</p>
        <p
            class="text profile__text"
            v-if="userStore.currentUser.tasks_type === 'индивидуальный'"
        >
            Чтобы начать обучение, добавьте ребенка
        </p>
        <p class="text profile__text" v-if="userStore.currentUser.tasks_type === 'групповой'">
            Чтобы начать обучение, создайте новую группу
        </p>
    </div>
    <div class="profile-child">
        <div
            class="profile-child__wrapper"
            v-for="(block, index) in userStore.children"
            :key="index"
        >
            <div class="delete-profile">
                <modalConfirm label="Удалить профиль">
                    <div class="delete-profile__wrapper">
                        <h3 class="delete-profile__title">
                            Удаление профиля ребенка
                        </h3>
                        <div>
                            <div class="delete-profile_content">
                                <p>
                                    Все данные {{ block.last_name }}&nbsp;{{
                                        block.first_name
                                    }}
                                    будут удалены.
                                </p>
                                <div class="regCheck delete-check">
                                    <input type="checkbox" />
                                    <div>&nbsp;Да, я хочу удалить профиль</div>
                                </div>
                            </div>
                            <div class="delete-profile_btn">
                                <Button
                                    class="delete-btn"
                                    label="Удалить"
                                    @click="deleteChild(block.id, index)"
                                ></Button>
                                <Button
                                    label="Отмена"
                                    class="delete-btn"
                                ></Button>
                            </div>
                        </div>
                    </div>
                </modalConfirm>
            </div>
            <div class="child__form">
                <p class="child__name">
                    {{ block.first_name }}&nbsp;{{ block.last_name }}
                </p>
                <p class="child__school">{{ block.school }}</p>
                <div class="child__scale">
                    <v-progress-linear
                        v-model:value="block.progress"
                        height="30"
                        class="scale"
                    >
                        <template v-slot:default="{ value }">
                            <strong>{{ Math.ceil(value) }}%</strong>
                        </template>
                    </v-progress-linear>
                </div>
                <RouterLink to="/Game" class="router-link">
                    <Button
                        label="Перейти к обучению"
                        class="profile__btn"
                    ></Button
                ></RouterLink>
            </div>
        </div>
        <modalWindow label="Добавить ребёнка"
            ><v-card
                prepend-icon="mdi-account"
                title="Введите данные ребёнка"
                class="window"
            >
                <v-card-text>
                    <div class="form-input">
                        <label>Фамилия</label>
                        <Input
                            placeholder="Фамилия"
                            name="login"
                            class="form-input"
                            v-model:value="form.first_name"
                        ></Input>
                    </div>
                    <div class="form-input">
                        <label>Имя</label>
                        <Input
                            placeholder="Имя"
                            name="login"
                            class="form-input"
                            v-model:value="form.last_name"
                        ></Input>
                    </div>
                    <div class="form-input">
                        <label>Пол</label>
                        <SelectSort
                            v-model="form.sex"
                            :items="tasksChoose"
                            name="select_position"
                            id="select-position"
                            :options="tasksChoose"
                            class="invents-select"
                            clearable
                            placeholder="Выберите пол"
                            variant="outlined"
                            :sorts-boolean="false"
                            @update:value="changeOption"
                            v-bind="props"
                        />
                    </div>
                    <div class="form-input">
                        <label>Возраст</label>
                        <Input
                            name="login"
                            class="form-input"
                            v-model:value="form.age"
                        ></Input>
                    </div>
                    <div class="form-input">
                        <label>Регион</label>
                        <SelectSort
                            @click="GetRegion"
                            :items="reg"
                            v-model="form.region"
                            :options="reg"
                            name="select_position"
                            id="select-position"
                            class="invents-select"
                            clearable
                            placeholder="Выберите регион из списка"
                            variant="outlined"
                            :sorts-boolean="false"
                            @update:value="changeOption"
                        />
                    </div>
                    <div class="form-input">
                        <label>Школа</label>
                        <Input
                            name="login"
                            class="form-input"
                            v-model:value="form.school"
                        ></Input>
                    </div>
                    <div class="form-input">
                        <label>Класс</label>
                        <Input
                            name="login"
                            class="form-input"
                            v-model:value="form.grade"
                        ></Input>
                    </div>
                    <div class="regCheck">
                        <input
                            type="checkbox"
                            v-model="form.attended_speech_therapist"
                        />
                        <div class="regCheck_text">
                            Ребенок ранее посещал логопеда?
                        </div>
                    </div>
                    <div class="regCheck">
                        <input
                            :dialog="false"
                            type="checkbox"
                            v-model="form.data_processing_agreement"
                        />
                        <div class="regCheck_text">
                            даю согласие на обработку персональных данных
                            и ознакомлен с политикой конфиденциальности
                        </div>
                    </div>
                </v-card-text>

                <v-card-actions>
                    <Button
                        label="Добавить ребёнка"
                        class="profile__btn add-child-btn"
                        @click="AddChild"
                    ></Button>
                </v-card-actions>
            </v-card>
        </modalWindow>
        <img
            v-if="userStore.children.length"
            class="profile-child__img"
            src="@app/assets/img/Profile/LesyaMoa.png"
            alt=""
        />
        <img
            v-if="!userStore.children.length"
            class="profile__img"
            src="@app/assets/img/Profile/lesyaandmoa.svg"
            alt=""
        />
    </div>
</template>
<script setup>
import { Button } from '@shared/components/buttons';
import { modalWindow, modalConfirm } from '@shared/components/modals';
import { HTTP } from '@app/http';
import { ref, onMounted, inject } from 'vue';
import { Input } from '@shared/components/inputs';
import { SelectSort } from '@shared/components/selects';
import { useRoute } from 'vue-router';
import { useUserStore } from '@layouts/stores/user';
const isError = ref([]);
const error = ref([]);
const swal = inject('$swal');
const route = useRoute();

const userStore = useUserStore();

const tasksChoose = ref([
    { value: 'Женский', name: 'Женский' },
    { value: 'Мужской', name: 'Мужской' },
]);
const reg = ref([]);
const form = ref({
    first_name: '',
    last_name: '',
    age: '',
    region: null,
    school: '',
    grade: '',
    attended_speech_therapist: false,
    sex: null,
    data_processing_agreement: false,
});
// const child = ref([
//     {
//         id: '',
//         first_name: '',
//         last_name: '',
//         school: '',
//     },
// ]);
const skill = ref({});

const deleteChild = async (id, index) => {
    try {
        const response = await HTTP.delete(`/children/${id}/`, {
            headers: {
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        });
        swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'успешно',
            showConfirmButton: false,
            timer: 1500,
        });
        userStore.children.splice(index, 1);
    } catch (error) {
        console.log('errr', error);
        isError.value = error.response.data;
        console.error('There was an error!', error);
        swal.fire({
            position: 'center',
            icon: 'error',
            title: `ошибка`,
            showConfirmButton: false,
            timer: 2500,
        });
    }
};

const AddChild = async () => {
    try {
        const response = await HTTP.post('/children/', form.value, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        });
        form.value = response.data;
        console.log(response.data);
        swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'успешно',
            showConfirmButton: false,
            timer: 1500,
        });
        // await GetChild();
        await fetchSkills();
    } catch (error) {
        console.log('errr', error);
        isError.value = error.response.data;
        console.error('There was an error!', error);
        swal.fire({
            position: 'center',
            icon: 'error',
            title: `ошибка`,
            showConfirmButton: false,
            timer: 2500,
        });
    }
};
const GetRegion = async () => {
    try {
        const response = await HTTP.get('/regions/', reg.value, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        reg.value = response.data;
        console.log(response.data);
    } catch (error) {
        console.log('errr', error);
        error.value = error.response.data;
        console.error('There was an error!', error);
    }
};
// const GetChild = async () => {
//     try {
//         const response = await HTTP.get(`/children/`, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: 'Token ' + localStorage.getItem('Token'),
//             },
//         });
//         child.value = response.data;
//         console.log(response.data);
//     } catch (error) {
//         console.log('errr', error);
//         isError.value = error.response.data;
//         console.error('There was an error!', error);
//     }
// };

const GetSkill = async (id, index) => {
    try {
        const response = await HTTP.get(`/answers/${id}/check_progress/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        });
        skill.value = response.data;
        console.log(response.data);
    } catch (error) {
        console.log('errr', error);
        isError.value = error.response.data;
        console.error('There was an error!', error);
    }
};
const fetchSkills = async () => {
    for (let i = 0; i < userStore.children.length; i++) {
        const id = userStore.children[i].id;
        await GetSkill(id, i);
    }
};
onMounted(async () => {
    await fetchSkills();
});
</script>
<style lang="scss" scoped>
.profile {
    position: relative;
    height: 640px;
    margin: 60px auto;
    width: 937px;

    &__wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 60px;
    }

    &__text {
        text-align: center;
        font-size: 28px;
        font-family: 'Nunito', sans-serif;
        font-weight: normal;
    }
}

.profile__btn {
    padding: 12px 104px;
    margin: 40px auto;
    margin-bottom: 0px;
}

.profile__img {
    max-width: 100%;
    position: absolute;
    top: -50px;
    z-index: -1;
    
    @media (max-width: 1200px) {
        object-fit: cover;
        height: 100%;
        left: 50%;
        margin-left: -490px;
    }
    @media (max-width: 975px) {
        margin-left: 0;
        left: 0;
    }
    @media (max-width: 568px) {
        top: 50px;
        height: 80%;
    }
}

.text__profile {
    font-size: 28px;
    font-family: 'Nunito', sans-serif;
    font-weight: normal;
}

.add-children {
    padding: 12px 104px;
    margin: 40px auto;
    margin-bottom: 0px;
    background-color: white;
    color: black;
    border: 3px solid #4d65e5;
}

.profile-child {
    display: flex;
    flex-direction: column;
    position: relative;
    min-height: 640px;
    margin: 40px auto 0 auto;
    max-width: 1200px;
    &__wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #b3cdf9;
        border-radius: 20px;
        padding: 20px;
        margin-bottom: 20px;
    }

    &__text {
        font-size: 28px;
        font-family: 'Nunito', sans-serif;
        font-weight: normal;
    }
}

.child__form {
    width: 1050px;
    text-align: center;
}

.delete-profile {
    align-self: flex-end;
}

.child__name {
    font-size: 28px;
}

.child__school {
    font-size: 20px;
    margin-bottom: 20px;
}

.v-progress-linear__background {
    color: white;
}

.scale {
    // color: #5ccf54;
    color: white;
    border-radius: 8px;
}

.scale strong {
    color: black;
}

.profile-child__img {
    margin: 0 45px -120px 45px;
}
.router-link {
    text-decoration-line: none;
}
.btn_primary {
    height: 58px;
}
.regCheck {
    margin-top: 8px;
    display: flex;
    margin-bottom: 20px;
    input {
        width: 20px;
        height: 20px;
        border: 1px solid black;
    }
    &_text {
        max-width: 320px;
        font-family: 'Nunito', sans-serif;
        font-size: 14px;
        color: #35383f;
        font-weight: 500;
        margin-left: 8px;
    }
}
.add-child-btn {
    margin: 0 0 32px 0;
}

// ///////////////////////////
.delete-profile__wrapper {
    padding: 40px;
    background-color: #fff;
    border-radius: 10px;
    max-width: 464px;
    min-height: 326px;
}
.delete-profile__title {
    font-size: 28px;
    font-family: 'Nunito', sans-serif;
    font-weight: 500;
    text-align: center;
    margin-bottom: 20px;
    color: #313131;
}
.delete-profile_content {
    padding-left: 5px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
}
.delete-check {
    margin-top: 15px;
}
.delete-check input {
    margin-top: 5px;
    font-size: 20px;
    color: #313131;
}
.delete-check div {
    color: #313131;
    font-size: 20px;
    font-family: 'Nunito', sans-serif;
}

.delete-profile_content p {
    color: #313131;
    font-size: 20px;
    font-family: 'Nunito', sans-serif;
}
.delete-profile_btn {
    display: flex;
    justify-content: space-between;
}
.delete-btn {
    width: 182px;
}
</style>
