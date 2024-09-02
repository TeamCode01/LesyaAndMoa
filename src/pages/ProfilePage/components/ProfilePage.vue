<template>
    <div
        class="profile__wrapper"
        v-if="!(userStore.children.length || groups.length)"
    >
        <p class="text text__profile">Спасибо за регистрацию!</p>
        <p
            class="text profile__text"
            v-if="userStore.currentUser.tasks_type === 'индивидуальный'"
        >
            Чтобы начать обучение, добавьте ребенка
        </p>
        <p
            class="text profile__text"
            v-if="userStore.currentUser.tasks_type === 'групповой'"
        >
            Чтобы начать обучение, создайте новую группу
        </p>
    </div>
    <div
        class="profile-child"
        v-if="userStore.currentUser.tasks_type === 'индивидуальный'"
    >
        <div
            class="profile-child__wrapper"
            v-for="(block, index) in userStore.children"
            :key="index"
        >
            <div class="delete-profile">
                <modalConfirm label="Удалить профиль">
                    <template #default="{ close }">
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
                                        <input
                                            type="checkbox"
                                            v-model="check"
                                        />
                                        <div>
                                            &nbsp;Да, я хочу удалить профиль
                                        </div>
                                    </div>
                                </div>
                                <div class="delete-profile_btn">
                                    <Button
                                        class="delete-btn"
                                        label="Удалить"
                                        @click="
                                            deleteChild(block.id, index);
                                            close();
                                        "
                                    ></Button>
                                    <Button
                                        label="Отмена"
                                        class="delete-btn"
                                        @click="close"
                                    ></Button>
                                </div>
                            </div>
                        </div>
                    </template>
                </modalConfirm>
            </div>
            <div class="child__form">
                <p class="child__name">
                    {{ block.first_name }}&nbsp;{{ block.last_name }}
                </p>
                <p class="child__school">{{ block.school }}</p>
                <div class="child__scale">
                    <v-progress-linear
                        v-model="skill[block.id].progress"
                        height="30"
                        class="scale"
                    >
                        <template v-slot:default="{ value }">
                            <strong>{{ Math.ceil(value) }}%</strong>
                        </template>
                    </v-progress-linear>
                </div>
                <router-link
                    :to="{
                        name: 'Game',
                        params: { idChildOrGroup: block.id },
                    }"
                    class="router-link"
                >
                    <Button
                        label="Перейти к обучению"
                        class="profile__btn"
                    ></Button>
                </router-link>
            </div>
        </div>
        <modalWindow
            v-if="userStore.currentUser.tasks_type === 'индивидуальный'"
            label="Добавить ребёнка"
        >
            <template #default="{ close }">
                <v-card
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
                                :class="{
                                    'form-input': true,
                                    red: isError.first_name,
                                }"
                                v-model:value="form.first_name"
                                @blur="v$.first_name.$touch()"
                            ></Input>
                            <span
                                v-if="isError.first_name"
                                class="error-message"
                                >{{ isError.first_name[0] }}</span
                            >
                        </div>
                        <div class="form-input">
                            <label>Имя</label>
                            <Input
                                placeholder="Имя"
                                name="login"
                                :class="{
                                    'form-input': true,
                                    red: isError.last_name,
                                }"
                                v-model:value="form.last_name"
                                @blur="v$.last_name.$touch()"
                            ></Input>
                            <span
                                v-if="isError.last_name"
                                class="error-message"
                                >{{ isError.last_name[0] }}</span
                            >
                        </div>
                        <div class="form-input">
                            <label>Пол</label>
                            <SelectSort
                                @blur="v$.sex.$touch()"
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
                            <span v-if="isError.sex" class="error-message">{{
                                isError.sex[0]
                            }}</span>
                        </div>
                        <div class="form-input">
                            <label>Возраст</label>
                            <Input
                                @blur="v$.age.$touch()"
                                name="login"
                                :class="{
                                    'form-input': true,
                                    red: isError.age,
                                }"
                                v-model:value="form.age"
                            ></Input>
                            <span v-if="isError.age" class="error-message">{{
                                isError.age[0]
                            }}</span>
                        </div>
                        <div class="form-input">
                            <label>Регион</label>
                            <SelectSort
                                @blur="v$.region.$touch()"
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
                            <span v-if="isError.region" class="error-message">{{
                                isError.region[0]
                            }}</span>
                        </div>
                        <div class="form-input">
                            <label>Школа</label>
                            <Input
                                @blur="v$.school.$touch()"
                                name="login"
                                :class="{
                                    'form-input': true,
                                    red: isError.school,
                                }"
                                v-model:value="form.school"
                            ></Input>
                            <span v-if="isError.school" class="error-message">{{
                                isError.school[0]
                            }}</span>
                        </div>
                        <div class="form-input">
                            <label>Класс</label>
                            <Input
                                @blur="v$.grade.$touch()"
                                name="login"
                                :class="{
                                    'form-input': true,
                                    red: isError.grade,
                                }"
                                v-model:value="form.grade"
                            ></Input>
                            <span v-if="isError.grade" class="error-message">{{
                                isError.grade[0]
                            }}</span>
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
                            :disabled="!isFormValidInd"
                            label="Добавить ребёнка"
                            class="profile__btn add-child-btn"
                            @click="
                                if (isFormValidInd) {
                                    AddChild();
                                    close();
                                }
                            "
                        ></Button>
                    </v-card-actions>
                </v-card>
            </template>
        </modalWindow>
        <img
            v-if="userStore.children.length"
            class="profile__img"
            src="@app/assets/img/Profile/lesyaandmoa.svg"
        />
        <img
            v-if="!userStore.children.length"
            class="profile-child__img"
            src="@app/assets/img/Profile/lesyaMoaParentAndChild.svg"
            alt=""
        />
    </div>
    <div
        class="profile-child"
        v-if="userStore.currentUser.tasks_type === 'групповой'"
    >
        <div
            class="profile-child__wrapper"
            v-for="(block, index) in userStore?.groups"
            :key="index"
        >
            <div class="delete-profile">
                <modalConfirm label="Удалить профиль">
                    <template #default="{ close }">
                        <div class="delete-profile__wrapper">
                            <h3 class="delete-profile__title">
                                Удаление группы
                            </h3>
                            <div>
                                <div class="delete-profile_content">
                                    <p>
                                        Все данные {{ block.name }}
                                        будут удалены.
                                    </p>
                                    <div class="regCheck delete-check">
                                        <input type="checkbox" />
                                        <div>
                                            &nbsp;Да, я хочу удалить группу
                                        </div>
                                    </div>
                                </div>
                                <div class="delete-profile_btn">
                                    <Button
                                        class="delete-btn"
                                        label="Удалить"
                                        @click="
                                            deleteGroup(block.id, index);
                                            close();
                                        "
                                    ></Button>
                                    <Button
                                        label="Отмена"
                                        class="delete-btn"
                                        @click="close"
                                    ></Button>
                                </div>
                            </div>
                        </div>
                    </template>
                </modalConfirm>
            </div>
            <div class="child__form">
                <p class="child__name">
                    {{ block.name }}
                </p>
                <p class="child__school">{{ block.school }}</p>
                <div class="child__scale">
                    <v-progress-linear
                        v-model="skill[block.id].progress"
                        height="30"
                        class="scale"
                    >
                        <template v-slot:default="{ value }">
                            <strong>{{ Math.ceil(value) }}%</strong>
                        </template>
                    </v-progress-linear>
                </div>
                <router-link
                    :to="{
                        name: 'Game',
                        params: { idChildOrGroup: block.id },
                    }"
                    class="router-link"
                >
                    <Button
                        label="Перейти к обучению"
                        class="profile__btn"
                    ></Button>
                </router-link>
            </div>
        </div>
        <modalWindow label="Добавить группу">
            <template #default="{ close }">
                <v-card
                    prepend-icon="mdi-account"
                    title="Введите данные группы"
                    class="window"
                >
                    <v-card-text>
                        <div class="form-input">
                            <label>Название группы</label>
                            <Input
                                name="login"
                                :class="{
                                    'form-input': true,
                                    red: isError.name,
                                }"
                                v-model:value="formGroup.name"
                                @blur="V$.name.$touch()"
                            ></Input>
                            <span v-if="isError.name" class="error-message">{{
                                isError.name[0]
                            }}</span>
                        </div>
                        <div class="form-input">
                            <label>Количество учеников в группе</label>
                            <Input
                                @blur="V$.number_of_students.$touch()"
                                name="login"
                                :class="{
                                    'form-input': true,
                                    red: isError.number_of_students,
                                }"
                                v-model:value="formGroup.number_of_students"
                            ></Input>
                            <span
                                v-if="isError.number_of_students"
                                class="error-message"
                                >{{ isError.number_of_students[0] }}</span
                            >
                        </div>
                        <div class="form-input">
                            <label>Средний возраст учеников группы</label>
                            <Input
                                @blur="V$.average_age.$touch()"
                                name="login"
                                :class="{
                                    'form-input': true,
                                    red: isError.average_age,
                                }"
                                v-model:value="formGroup.average_age"
                            ></Input>
                            <span
                                v-if="isError.average_age"
                                class="error-message"
                                >{{ isError.average_age[0] }}</span
                            >
                        </div>
                        <div class="form-input">
                            <label>Регион</label>
                            <SelectSort
                                @blur="V$.region.$touch()"
                                @click="GetRegion"
                                :items="reg"
                                v-model="formGroup.region"
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
                            <span v-if="isError.region" class="error-message">{{
                                isError.region[0]
                            }}</span>
                        </div>
                        <div class="form-input">
                            <label>Школа</label>
                            <Input
                                @blur="V$.school.$touch()"
                                name="login"
                                :class="{
                                    'form-input': true,
                                    red: isError.school,
                                }"
                                v-model:value="formGroup.school"
                            ></Input>
                            <span v-if="isError.school" class="error-message">{{
                                isError.school[0]
                            }}</span>
                        </div>
                    </v-card-text>

                    <v-card-actions>
                        <Button
                            :disabled="!isFormValidGrp"
                            label="Добавить группу"
                            class="profile__btn add-child-btn"
                            @click="
                                if (isFormValidGrp) {
                                    AddGroup();
                                    close();
                                }
                            "
                        ></Button>
                    </v-card-actions>
                </v-card>
            </template>
        </modalWindow>
        <img
            v-if="!userStore?.groups.length"
            class="profile-child__img"
            src="@app/assets/img/Profile/Moa.svg"
            alt=""
        />
        <img
            v-if="userStore?.groups.length"
            class="profile-child__img"
            src="@app/assets/img/Profile/lesyaProfileGroup.svg"
            alt=""
        />
    </div>
</template>
<script setup>
import { Button } from '@shared/components/buttons';
import { modalWindow, modalConfirm } from '@shared/components/modals';
import { HTTP } from '@app/http';
import { ref, onMounted, watch, computed } from 'vue';
import { Input } from '@shared/components/inputs';
import { SelectSort } from '@shared/components/selects';
import { useRoute } from 'vue-router';
import { useUserStore } from '@layouts/stores/user';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { watchEffect } from 'vue';

const error = ref([]);
const route = useRoute();

const userStore = useUserStore();
const dialog = ref(false);

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
const formGroup = ref({
    name: '',
    number_of_students: '',
    average_age: '',
    region: null,
    school: '',
});

const skill = ref({});
const rules = {
    first_name: { required },
    last_name: { required },
    age: { required },
    region: { required },
    school: { required },
    grade: { required },
    sex: { required },
    name: { required },
    number_of_students: { required },
    average_age: { required },
};

const v$ = useVuelidate(rules, form, formGroup);
const V$ = useVuelidate(rules, formGroup);
const isError = ref({});

watchEffect(() => {
    isError.value = {};
    if (v$.value.$invalid) {
        if (v$.value.first_name.$error) {
            isError.value.first_name = ['Поле должно быть заполнено'];
        }
        if (v$.value.last_name.$error) {
            isError.value.last_name = ['Имя обязательно для заполнения'];
        }
        if (v$.value.sex.$error) {
            isError.value.sex = ['Поле должно быть заполнено'];
        }
        if (v$.value.age.$error) {
            isError.value.age = ['Поле должно быть заполнено'];
        }
        if (form.value.age < 0 || form.value.age > 17) {
            isError.value.age = ['Возраст должен быть между 0 и 17'];
        }
        if (v$.value.grade.$error) {
            isError.value.grade = ['Поле должно быть заполнено'];
        }
        if (v$.value.school.$error) {
            isError.value.school = ['Поле должно быть заполнено'];
        }
        if (v$.value.region.$error) {
            isError.value.region = ['Поле должно быть заполнено'];
        }
    }
    if (V$.value.$invalid) {
        if (V$.value.school.$error) {
            isError.value.school = ['Поле должно быть заполнено'];
        }
        if (V$.value.region.$error) {
            isError.value.region = ['Поле должно быть заполнено'];
        }
        if (V$.value.name.$error) {
            isError.value.name = ['Поле должно быть заполнено'];
        }
        if (V$.value.number_of_students.$error) {
            isError.value.number_of_students = ['Поле должно быть заполнено'];
        }
        if (
            formGroup.value.average_age < 0 ||
            formGroup.value.average_age > 17
        ) {
            isError.value.average_age = ['Возраст должен быть между 0 и 17'];
        }
        if (V$.value.average_age.$error) {
            isError.value.average_age = ['Поле должно быть заполнено'];
        }
    }
});
const isFormValidInd = computed(() => {
    return (
        form.value.first_name !== '' &&
        form.value.last_name !== '' &&
        form.value.sex !== '' &&
        form.value.age !== '' &&
        form.value.region !== '' &&
        form.value.school !== '' &&
        form.value.grade !== '' &&
        form.value.attended_speech_therapist &&
        form.value.data_processing_agreement
    );
});
const isFormValidGrp = computed(() => {
    return (
        formGroup.value.name !== '' &&
        formGroup.value.number_of_students !== '' &&
        formGroup.value.region !== '' &&
        formGroup.value.school !== '' &&
        formGroup.value.average_age
    );
});

const deleteChild = async (id, index) => {
    try {
        const response = await HTTP.delete(`/children/${id}/`, {
            headers: {
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        });
        userStore.children.splice(index, 1);
    } catch (error) {
        console.log('errr', error);
        isError.value = error.response.data;
    }
};
const deleteGroup = async (id, index) => {
    try {
        const response = await HTTP.delete(`/groups/${id}/`, {
            headers: {
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        });
        groups.splice(index, 1);
    } catch (error) {
        console.log('errr', error);
        isError.value = error.response.data;
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
        await userStore.getChildren();
        fetchSkills();
    } catch (error) {
        console.log('errr', error);
        isError.value = error.response.data;
    }
};
const AddGroup = async () => {
    try {
        const response = await HTTP.post('/groups/', formGroup.value, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        });
        formGroup.value = response.data;
        await GetGroup();
        fetchSkills();
    } catch (error) {
        console.log('errr', error);
        isError.value = error.response.data;
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
    } catch (error) {
        console.log('errr', error);
        error.value = error.response.data;
    }
};

const GetSkill = async (id, index) => {
    try {
        const response = await HTTP.get(`/answers/${id}/check_progress/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        });
        skill.value[id] = response.data;
    } catch (error) {
        console.log('errr', error);
        isError.value = error.response.data;
    }
};
const fetchSkills = () => {
    if (userStore.currentUser.tasks_type === 'индивидуальный') {
        for (let i = 0; i < userStore.children.length; i++) {
            const id = userStore.children[i].id;
            GetSkill(id, i);
        }
    }
    if (userStore.currentUser.tasks_type === 'групповой') {
        for (let i = 0; i < userStore.groups.length; i++) {
            const id = userStore.groups[i].id;
            GetSkill(id, i);
        }
    }
};

watch(
    () => userStore.children,
    () => userStore.groups,

    (newSkill) => {
        if (!newSkill) {
            console.log('here');
        }
        fetchSkills();
    },
    { immediate: true },
);

onMounted(() => {
    fetchSkills();
    userStore.getGroups();
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

    @media (max-width: 460px) {
        padding: 12px 60px;
        font-size: 16px;
    }
}

.profile__img,
.profile-child__img {
    max-width: 850.55px;
    align-self: center;

    @media (max-width: 1200px) {
        object-fit: cover;
        height: 100%;
    }

    @media (max-width: 975px) {
        max-width: 100%;
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
    min-width: 100%;
    padding: 0 80px;
    text-align: center;

    @media (max-width: 768px) {
        padding: 0 20px;
    }
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
    max-width: 100%;

    @media (max-width: 1200px) {
        top: 60px;
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

.error-message {
    font-family: 'Nunito', sans-serif;
    color: #ff535c;
    font-size: 16px;
    font-weight: 400;
    line-height: 21.82px;
}
</style>
