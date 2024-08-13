const dataTask = [
    [{ id: 1, text: ' б ', isActive: true, error: 0, type: 'word', answer: 1 }, { id: 2, text: ' а ', isActive: true, error: 0, type: 'word', answer: 0 }, { id: 3, text: ' р ', isActive: true, error: 0, type: 'word', answer: 0 }, { id: 4, text: ' в ', isActive: true, error: 0, type: 'word', answer: 0 }, { id: 5, text: ' д ', isActive: true, error: 0, type: 'word', answer: 2 }, { id: 6, text: ' у ', isActive: true, error: 0, type: 'word', answer: 0 }],
    [{ id: 1, sound: '/', isActive: true, error: 0, type: 'sound', answer: 0 }, { id: 2, sound: '/', isActive: true, error: 0, type: 'sound', answer: 1 }, { id: 3, sound: '/', isActive: true, error: 0, type: 'sound', answer: 2 }, { id: 4, sound: '/', isActive: true, error: 0, type: 'sound', answer: 0 }]
];

const dataAnswer = [
    {
        id: 1,
        img: '/assets/backgrounds/lesyaandmoasmall.svg',
        word: { id: 1, text: ' б ', isActive: false, error: 0, type: 'word' },
        sound: { id: 1, text: 'р', isActive: false, error: 0, type: 'sound' }
    },
    {
        id: 2,
        img: '/assets/backgrounds/lesyaandmoasmall.svg',
        word: { id: 2, text: ' д ', isActive: false, error: 0, type: 'word' },
        sound: { id: 2, text: 'р', isActive: false, error: 0, type: 'sound' }
    }
];

export { dataTask, dataAnswer };