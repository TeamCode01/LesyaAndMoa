const dataTask = [
    {
        stringid: 1,
        string: [
            {
                wordid: 1,
                word: [
                    { id: 1, classid: 1, text: 'Я', isActive: true },
                    { id: 2, classid: 2, text: 'Л', isActive: true },
                    { id: 3, classid: 3, text: 'Д', isActive: true },
                ]
            },
            {
                wordid: 2,
                word: [
                    { id: 1, classid: 1, text: 'К', isActive: true },
                    { id: 2, classid: 4, text: 'и', isActive: true },
                    { id: 3, classid: 3, text: 'П', isActive: true },
                    { id: 4, classid: 5, text: 'С', isActive: true },
                    { id: 5, classid: 6, text: 'О', isActive: true },
                    { id: 6, classid: 7, text: 'Т', isActive: true },
                    { id: 7, classid: 8, text: 'о', isActive: true },
                    { id: 8, classid: 9, text: 'й', isActive: true },
                    { id: 9, classid: 10, text: 'Р', isActive: true },
                ]
            },
            {
                wordid: 3,
                word: [
                    { id: 1, classid: 6, text: 'О', isActive: true },
                    { id: 2, classid: 5, text: 'М', isActive: true },
                    { id: 3, classid: 3, text: 'Д', isActive: true },
                    { id: 4, classid: 7, text: 'И', isActive: true },
                    { id: 5, classid: 7, text: 'к', isActive: true },
                    { id: 6, classid: 9, text: 'а', isActive: true },
                ]
            },
            {
                wordid: 4,
                word: [
                    { id: 1, classid: 2, text: 'Ы', isActive: true },
                    { id: 2, classid: 3, text: 'М', isActive: true },
                ]
            },
            {
                wordid: 5,
                word: [
                    { id: 1, classid: 10, text: 'М', isActive: true },
                    { id: 2, classid: 7, text: 'ё', isActive: true },
                    { id: 3, classid: 3, text: 'В', isActive: true },
                    { id: 4, classid: 6, text: 'О', isActive: true },
                    { id: 5, classid: 9, text: 'м', isActive: true },
                    { id: 6, classid: 5, text: 'З', isActive: true },
                    { id: 7, classid: 7, text: 'Ь', isActive: true },
                ]
            },
        ]
    },

    {
        stringid: 2,
        string: [
            {
                wordid: 6,
                word: [
                    { id: 1, classid: 6, text: 'Е', isActive: true },
                    { id: 2, classid: 7, text: 'Т', isActive: true },
                    { id: 3, classid: 3, text: 'В', isActive: true },
                    { id: 4, classid: 9, text: 'К', isActive: true },
                    { id: 5, classid: 9, text: 'и', isActive: true },
                ]
            },
            {
                wordid: 7,
                word: [
                    { id: 1, classid: 6, text: 'О', isActive: true },
                    { id: 2, classid: 8, text: 'к', isActive: true },
                    { id: 3, classid: 9, text: 'у', isActive: true },
                    { id: 4, classid: 5, text: 'Щ', isActive: true },
                    { id: 5, classid: 7, text: 'Е', isActive: true },
                    { id: 6, classid: 3, text: 'Д', isActive: true },
                    { id: 7, classid: 10, text: 'Ч', isActive: true },
                ]
            },
            {
                wordid: 8,
                word: [
                    { id: 1, classid: 6, text: 'Е', isActive: true },
                    { id: 2, classid: 5, text: 'Н', isActive: true },
                    { id: 3, classid: 3, text: 'В', isActive: true },
                    { id: 4, classid: 10, text: 'И', isActive: true },
                    { id: 5, classid: 1, text: 'К', isActive: true },
                ]
            },
            {
                wordid: 9,
                word: [
                    { id: 1, classid: 6, text: 'К', isActive: true },
                    { id: 2, classid: 5, text: 'О', isActive: true },
                    { id: 3, classid: 3, text: 'С', isActive: true },
                    { id: 4, classid: 10, text: 'Т', isActive: true },
                    { id: 5, classid: 9, text: 'ч', isActive: true },
                ]
            },
            {
                wordid: 10,
                word: [
                    { id: 1, classid: 10, text: 'Т', isActive: true },
                    { id: 2, classid: 8, text: 'о', isActive: true },
                    { id: 3, classid: 3, text: 'П', isActive: true },
                    { id: 4, classid: 5, text: 'Л', isActive: true },
                    { id: 5, classid: 1, text: 'К', isActive: true },
                    { id: 6, classid: 7, text: 'А', isActive: true },
                ]
            }
        ]
    }
];

const dataAnswer = [
    {
        stringid: 1,
        string: [
            {
                wordid: 1,
                word: [
                    { id: 3, classid: 3, text: 'Д', isActive: false },
                    { id: 2, classid: 2, text: 'л', isActive: false },
                    { id: 1, classid: 1, text: 'я', isActive: false },
                ]
            },
            {
                wordid: 2,
                word: [
                    { id: 3, classid: 3, text: 'п', isActive: false },
                    { id: 5, classid: 6, text: 'о', isActive: false },
                    { id: 4, classid: 5, text: 'с', isActive: false },
                    { id: 6, classid: 7, text: 'т', isActive: false },
                    { id: 9, classid: 10, text: 'р', isActive: false },
                    { id: 7, classid: 8, text: 'о', isActive: false },
                    { id: 8, classid: 9, text: 'й', isActive: false },
                    { id: 1, classid: 1, text: 'к', isActive: false },
                    { id: 2, classid: 4, text: 'и', isActive: false },


                ]
            },
            {
                wordid: 3,
                word: [
                    { id: 3, classid: 3, text: 'д', isActive: false },
                    { id: 1, classid: 6, text: 'о', isActive: false },
                    { id: 2, classid: 5, text: 'м', isActive: false },
                    { id: 4, classid: 7, text: 'и', isActive: false },
                    { id: 5, classid: 7, text: 'к', isActive: false },
                    { id: 6, classid: 9, text: 'а', isActive: false },
                ]
            },
            {
                wordid: 4,
                word: [
                    { id: 2, classid: 3, text: 'м', isActive: false },
                    { id: 1, classid: 2, text: 'ы', isActive: false },
                ]
            },

        ]
    },

    {
        stringid: 2,
        string: [
            {
                wordid: 5,
                word: [
                    { id: 3, classid: 3, text: 'в', isActive: false },
                    { id: 4, classid: 6, text: 'о', isActive: false },
                    { id: 6, classid: 5, text: 'з', isActive: false },
                    { id: 7, classid: 7, text: 'ь', isActive: false },
                    { id: 1, classid: 10, text: 'м', isActive: false },
                    { id: 2, classid: 7, text: 'ё', isActive: false },
                    { id: 5, classid: 9, text: 'м', isActive: false },
                ]
            },
            {

                wordid: 6,
                word: [
                    { id: 3, classid: 3, text: 'в', isActive: false },
                    { id: 1, classid: 6, text: 'е', isActive: false },
                    { id: 2, classid: 7, text: 'т', isActive: false },
                    { id: 4, classid: 9, text: 'к', isActive: false },
                    { id: 5, classid: 9, text: 'и', isActive: false },
                ]
            },
            {
                wordid: 7,
                word: [
                    { id: 6, classid: 3, text: 'д', isActive: false },
                    { id: 1, classid: 6, text: 'о', isActive: false },
                    { id: 4, classid: 5, text: 'щ', isActive: false },
                    { id: 5, classid: 7, text: 'е', isActive: false },
                    { id: 7, classid: 10, text: 'ч', isActive: false },
                    { id: 2, classid: 8, text: 'к', isActive: false },
                    { id: 3, classid: 9, text: 'у', isActive: false },
                ]
            },
        ]
    },

    {
        stringid: 3,
        string: [
            {
                wordid: 8,
                word: [
                    { id: 3, classid: 3, text: 'в', isActive: false },
                    { id: 1, classid: 6, text: 'е', isActive: false },
                    { id: 2, classid: 5, text: 'н', isActive: false },
                    { id: 4, classid: 10, text: 'и', isActive: false },
                    { id: 5, classid: 1, text: 'к', isActive: false },
                ]
            },
            {
                wordid: 9,
                word: [
                    { id: 3, classid: 3, text: 'с', isActive: false },
                    { id: 1, classid: 6, text: 'к', isActive: false },
                    { id: 2, classid: 5, text: 'о', isActive: false },
                    { id: 4, classid: 10, text: 'т', isActive: false },
                    { id: 5, classid: 9, text: 'ч', isActive: false },
                ]
            },
            {
                wordid: 10,
                word: [
                    { id: 3, classid: 3, text: 'п', isActive: false },
                    { id: 4, classid: 5, text: 'л', isActive: false },
                    { id: 6, classid: 7, text: 'а', isActive: false },
                    { id: 1, classid: 10, text: 'т', isActive: false },
                    { id: 2, classid: 8, text: 'о', isActive: false },
                    { id: 5, classid: 1, text: 'к', isActive: false },
                ]
            }
        ]
    }
];

export { dataTask, dataAnswer };