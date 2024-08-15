const dataTask = [
    [{ id: 1, text: 'ВЕС', isActive: true, error: 0 }, { id: 2, text: 'ВЕ', isActive: true, error: 0 }, { id: 3, text: 'СЁ', isActive: true, error: 0 }, { id: 4, text: 'СЁЛ', isActive: true, error: 0 }, { id: 5, text: 'ЛЫ', isActive: true, error: 0 }, { id: 6, text: 'Е', isActive: true, error: 0 }, { id: 7, text: 'РЕ', isActive: true, error: 0 }, { id: 8, text: 'РЕБ', isActive: true, error: 0 }, { id: 9, text: 'БЯ', isActive: true, error: 0 }, { id: 10, text: 'ЯТА', isActive: true, error: 0 }, { id: 11, text: 'ТА', isActive: true, error: 0 }],
    [{ id: 12, text: 'НАШ', isActive: true, error: 0 }, { id: 13, text: 'НА', isActive: true, error: 0 }, { id: 14, text: 'ШИ', isActive: true, error: 0 }, { id: 15, text: 'Д', isActive: true, error: 0 }, { id: 16, text: 'ДРУ', isActive: true, error: 0 }, { id: 17, text: 'ЗЬ', isActive: true, error: 0 }, { id: 18, text: 'ЗЬЯ', isActive: true, error: 0 }]
];

const dataAnswer =
{
    data: [[
        { id: 1, data: [{ id: 2, text: 'ВЕ', isActive: false, error: 0 }, { id: 3, text: 'СЁ', isActive: false, error: 0 }, { id: 5, text: 'ЛЫ', isActive: false, error: 0 }, { id: 6, text: 'Е', isActive: false, error: 0 }], answerCounter: 0 },
        { id: 2, data: [{ id: 7, text: 'РЕ', isActive: false, error: 0 }, { id: 9, text: 'БЯ', isActive: false, error: 0 }, { id: 11, text: 'ТА', isActive: false, error: 0 }], answerCounter: 0 }
    ],
    [
        { id: 3, data: [{ id: 13, text: 'НА', isActive: false, error: 0 }, { id: 14, text: 'ШИ', isActive: false, error: 0 }], answerCounter: 0 },
        { id: 4, data: [{ id: 16, text: 'ДРУ', isActive: false, error: 0 }, { id: 18, text: 'ЗЬЯ', isActive: false, error: 0 }], answerCounter: 0 }
    ]],
    answerCounter: 0
};

export { dataTask, dataAnswer };