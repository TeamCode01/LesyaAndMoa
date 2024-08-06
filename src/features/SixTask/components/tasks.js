import { id } from "vuetify/locale";

const tasksData = [
    // Вариант 1
    [
        [{ id: 1, text: '' }, { id: 2, text: 'А' }, { id: 3, text: 'Я' }, { id: 4, text: 'У' }, { id: 5, text: 'Ю' }, { id: 6, text: 'О' }, { id: 7, text: 'Ё' }, { id: 8, text: 'Э' }, { id: 9, text: 'Е' }, { id: 10, text: 'Ы' }, { id: 11, text: 'И' }],
        [{ id: 12, text: 'Б' }, { id: 13, text: '' }, { id: 14, text: '' }, { id: 15, text: '' }, { id: 16, text: '' }, { id: 17, text: '' }, { id: 18, text: '' }, { id: 19, text: '' }, { id: 20, text: '' }, { id: 21, text: '' }, { id: 22, text: '' }],
        [{ id: 23, text: 'В' }, { id: 24, text: '' }, { id: 25, text: '' }, { id: 26, text: '' }, { id: 27, text: '' }, { id: 28, text: '' }, { id: 29, text: '' }, { id: 30, text: '' }, { id: 31, text: '' }, { id: 32, text: '' }, { id: 33, text: '' }],
        [{ id: 34, text: 'Г' }, { id: 35, text: '' }, { id: 36, text: '' }, { id: 37, text: '' }, { id: 38, text: '' }, { id: 39, text: '' }, { id: 40, text: '' }, { id: 41, text: '' }, { id: 42, text: '' }, { id: 43, text: '' }, { id: 44, text: '' }],
        [{ id: 45, text: 'Д' }, { id: 46, text: '' }, { id: 47, text: '' }, { id: 48, text: '' }, { id: 49, text: '' }, { id: 50, text: '' }, { id: 51, text: '' }, { id: 52, text: '' }, { id: 53, text: '' }, { id: 54, text: '' }, { id: 55, text: '' }],
        [{ id: 56, text: 'Ж' }, { id: 57, text: '' }, { id: 58, text: '' }, { id: 59, text: '' }, { id: 60, text: '' }, { id: 61, text: '' }, { id: 62, text: '' }, { id: 63, text: '' }, { id: 64, text: '' }, { id: 65, text: '' }, { id: 66, text: '' }],
    ],

    // Вариант 2
    [
        [{ id: 1, text: '' }, { id: 2, text: 'А' }, { id: 3, text: 'Я' }, { id: 4, text: 'У' }, { id: 5, text: 'Ю' }, { id: 6, text: 'О' }, { id: 7, text: 'Ё' }, { id: 8, text: 'Э' }, { id: 9, text: 'Е' }, { id: 10, text: 'Ы' }, { id: 11, text: 'И' }],
        [{ id: 12, text: 'З' }, { id: 13, text: '' }, { id: 14, text: '' }, { id: 15, text: '' }, { id: 16, text: '' }, { id: 17, text: '' }, { id: 18, text: '' }, { id: 19, text: '' }, { id: 20, text: '' }, { id: 21, text: '' }, { id: 22, text: '' }],
        [{ id: 23, text: 'К' }, { id: 24, text: '' }, { id: 25, text: '' }, { id: 26, text: '' }, { id: 27, text: '' }, { id: 28, text: '' }, { id: 29, text: '' }, { id: 30, text: '' }, { id: 31, text: '' }, { id: 32, text: '' }, { id: 33, text: '' }],
        [{ id: 34, text: 'Л' }, { id: 35, text: '' }, { id: 36, text: '' }, { id: 37, text: '' }, { id: 38, text: '' }, { id: 39, text: '' }, { id: 40, text: '' }, { id: 41, text: '' }, { id: 42, text: '' }, { id: 43, text: '' }, { id: 44, text: '' }],
        [{ id: 45, text: 'М' }, { id: 46, text: '' }, { id: 47, text: '' }, { id: 48, text: '' }, { id: 49, text: '' }, { id: 50, text: '' }, { id: 51, text: '' }, { id: 52, text: '' }, { id: 53, text: '' }, { id: 54, text: '' }, { id: 55, text: '' }],
        [{ id: 56, text: 'Н' }, { id: 57, text: '' }, { id: 58, text: '' }, { id: 59, text: '' }, { id: 60, text: '' }, { id: 61, text: '' }, { id: 62, text: '' }, { id: 63, text: '' }, { id: 64, text: '' }, { id: 65, text: '' }, { id: 66, text: '' }],
    ],

    // Вариант 3
    [
        [{ id: 1, text: '' }, { id: 2, text: 'А' }, { id: 3, text: 'Я' }, { id: 4, text: 'У' }, { id: 5, text: 'Ю' }, { id: 6, text: 'О' }, { id: 7, text: 'Ё' }, { id: 8, text: 'Э' }, { id: 9, text: 'Е' }, { id: 10, text: 'Ы' }, { id: 11, text: 'И' }],
        [{ id: 12, text: 'П' }, { id: 13, text: '' }, { id: 14, text: '' }, { id: 15, text: '' }, { id: 16, text: '' }, { id: 17, text: '' }, { id: 18, text: '' }, { id: 19, text: '' }, { id: 20, text: '' }, { id: 21, text: '' }, { id: 22, text: '' }],
        [{ id: 23, text: 'Р' }, { id: 24, text: '' }, { id: 25, text: '' }, { id: 26, text: '' }, { id: 27, text: '' }, { id: 28, text: '' }, { id: 29, text: '' }, { id: 30, text: '' }, { id: 31, text: '' }, { id: 32, text: '' }, { id: 33, text: '' }],
        [{ id: 34, text: 'С' }, { id: 35, text: '' }, { id: 36, text: '' }, { id: 37, text: '' }, { id: 38, text: '' }, { id: 39, text: '' }, { id: 40, text: '' }, { id: 41, text: '' }, { id: 42, text: '' }, { id: 43, text: '' }, { id: 44, text: '' }],
        [{ id: 45, text: 'Т' }, { id: 46, text: '' }, { id: 47, text: '' }, { id: 48, text: '' }, { id: 49, text: '' }, { id: 50, text: '' }, { id: 51, text: '' }, { id: 52, text: '' }, { id: 53, text: '' }, { id: 54, text: '' }, { id: 55, text: '' }],
        [{ id: 56, text: 'Ф' }, { id: 57, text: '' }, { id: 58, text: '' }, { id: 59, text: '' }, { id: 60, text: '' }, { id: 61, text: '' }, { id: 62, text: '' }, { id: 63, text: '' }, { id: 64, text: '' }, { id: 65, text: '' }, { id: 66, text: '' }],
    ],

    // Вариант 4
    [
        [{ id: 1, text: '' }, { id: 2, text: 'А' }, { id: 3, text: 'Я' }, { id: 4, text: 'У' }, { id: 5, text: 'Ю' }, { id: 6, text: 'О' }, { id: 7, text: 'Ё' }, { id: 8, text: 'Э' }, { id: 9, text: 'Е' }, { id: 10, text: 'Ы' }, { id: 11, text: 'И' }],
        [{ id: 12, text: 'Х' }, { id: 13, text: '' }, { id: 14, text: '' }, { id: 15, text: '' }, { id: 16, text: '' }, { id: 17, text: '' }, { id: 18, text: '' }, { id: 19, text: '' }, { id: 20, text: '' }, { id: 21, text: '' }, { id: 22, text: '' }],
        [{ id: 23, text: 'Ц' }, { id: 24, text: '' }, { id: 25, text: '' }, { id: 26, text: '' }, { id: 27, text: '' }, { id: 28, text: '' }, { id: 29, text: '' }, { id: 30, text: '' }, { id: 31, text: '' }, { id: 32, text: '' }, { id: 33, text: '' }],
        [{ id: 34, text: 'Ч' }, { id: 35, text: '' }, { id: 36, text: '' }, { id: 37, text: '' }, { id: 38, text: '' }, { id: 39, text: '' }, { id: 40, text: '' }, { id: 41, text: '' }, { id: 42, text: '' }, { id: 43, text: '' }, { id: 44, text: '' }],
        [{ id: 45, text: 'Ш' }, { id: 46, text: '' }, { id: 47, text: '' }, { id: 48, text: '' }, { id: 49, text: '' }, { id: 50, text: '' }, { id: 51, text: '' }, { id: 52, text: '' }, { id: 53, text: '' }, { id: 54, text: '' }, { id: 55, text: '' }],
        [{ id: 56, text: 'Щ' }, { id: 57, text: '' }, { id: 58, text: '' }, { id: 59, text: '' }, { id: 60, text: '' }, { id: 61, text: '' }, { id: 62, text: '' }, { id: 63, text: '' }, { id: 64, text: '' }, { id: 65, text: '' }, { id: 66, text: '' }],
    ],
];

export { tasksData };