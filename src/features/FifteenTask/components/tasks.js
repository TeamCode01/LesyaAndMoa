const tasksData = [
    [
        [{ x: 0, y: 0, text: ' ' }, { x: 1, y: 0, text: 'А' }, { x: 2, y: 0, text: 'Б' }, { x: 3, y: 0, text: 'В' }, { x: 4, y: 0, text: 'Г' }, { x: 5, y: 0, text: 'Д', isActive: true }],
        [{ x: 0, y: 1, text: '1' }, { x: 1, y: 1, text: 'ЛЕ' }, { x: 2, y: 1, text: 'У' }, { x: 3, y: 1, text: 'РЕ' }, { x: 4, y: 1, text: 'ОТ' }, { x: 5, y: 1, text: 'БЕЛ', isActive: true }],
        [{ x: 0, y: 2, text: '2' }, { x: 1, y: 2, text: 'Я' }, { x: 2, y: 2, text: 'НЕ' }, { x: 3, y: 2, text: 'ДИ' }, { x: 4, y: 2, text: 'И' }, { x: 5, y: 2, text: 'НЯ', isActive: true }],
        [{ x: 0, y: 3, text: '3' }, { x: 1, y: 3, text: 'БЫ' }, { x: 2, y: 3, text: 'КА' }, { x: 3, y: 3, text: 'ЛИ' }, { x: 4, y: 3, text: 'В' }, { x: 5, y: 3, text: 'ДЯ', isActive: true }],
        [{ x: 0, y: 4, text: '4' }, { x: 1, y: 4, text: 'НАЙ' }, { x: 2, y: 4, text: 'МЕ' }, { x: 3, y: 4, text: 'КО' }, { x: 4, y: 4, text: 'ТЕЛ' }, { x: 5, y: 4, text: 'ДЕ', isActive: true }],
        [{ x: 0, y: 5, text: '5' }, { x: 1, y: 5, text: 'ВА' }, { x: 2, y: 5, text: 'ГДЕ' }, { x: 3, y: 5, text: 'МУ' }, { x: 4, y: 5, text: 'ДА' }, { x: 5, y: 5, text: 'ПАЛ', isActive: true }]
    ],

    [
        {
            id: 1,
            data: [
                { id: 1, data: [{ id: 1, x: 1, y: 2, text: 'A2', isActive: false }], answerCounter: 0 },
                { id: 2, data: [{ id: 2, x: 2, y: 1, text: 'Б1', isActive: false }, { id: 3, x: 5, y: 5, text: 'Д5', isActive: false }], answerCounter: 0 },
                { id: 3, data: [{ id: 4, x: 4, y: 3, text: 'Г3', isActive: false }], answerCounter: 0 },
                { id: 4, data: [{ id: 5, x: 1, y: 2, text: 'А2', isActive: false }, { id: 6, x: 3, y: 5, text: 'В5', isActive: false }], answerCounter: 0 },
                { id: 5, data: [{ id: 7, x: 1, y: 4, text: 'А4', isActive: false }, { id: 8, x: 3, y: 2, text: 'В2', isActive: false }], answerCounter: 0 },
                { id: 6, data: [{ id: 9, x: 2, y: 4, text: 'Б4', isActive: false }, { id: 10, x: 5, y: 2, text: 'Д2', isActive: false }], answerCounter: 0 },
                { id: 7, data: [{ id: 11, x: 2, y: 2, text: 'Б2', isActive: false }, { id: 12, x: 4, y: 5, text: 'Г5', isActive: false }, { id: 13, x: 1, y: 1, text: 'A1', isActive: false }, { id: 14, x: 3, y: 4, text: 'В4', isActive: false }], answerCounter: 0 }
            ],
            answerCounter: 0
        },
        {
            id: 2,
            data: [
                { id: 8, data: [{ id: 15, x: 4, y: 1, text: 'Г1', isActive: false }], answerCounter: 0 },
                { id: 9, data: [{ id: 16, x: 5, y: 4, text: 'Д4', isActive: false }, { id: 17, x: 3, y: 1, text: 'В1', isActive: false }, { id: 18, x: 1, y: 5, text: 'A5', isActive: false }], answerCounter: 0 },
                { id: 10, data: [{ id: 19, x: 2, y: 5, text: 'Б5', isActive: false }], answerCounter: 0 },
                { id: 11, data: [{ id: 20, x: 1, y: 3, text: 'А3', isActive: false }, { id: 21, x: 3, y: 3, text: 'В3', isActive: false }], answerCounter: 0 },
                { id: 12, data: [{ id: 22, x: 5, y: 1, text: 'Д1', isActive: false }, { id: 23, x: 2, y: 3, text: 'Б3', isActive: false }], answerCounter: 0 },
                { id: 13, data: [{ id: 24, x: 4, y: 2, text: 'Г2', isActive: false }], answerCounter: 0 },
                { id: 14, data: [{ id: 25, x: 5, y: 3, text: 'Д3', isActive: false }, { id: 26, x: 4, y: 4, text: 'Г4', isActive: false }], answerCounter: 0 }
            ],
            answerCounter: 0
        }
    ]
];

export { tasksData };