const dataTask = [
    [
        { id: 1, text: ' б ', isActive: true, error: 0, type: 'word', answer: 1, audio: 'Task14/380.14.mp3' },
        { id: 2, text: ' а ', isActive: true, error: 0, type: 'word', answer: 0, audio: 'Task14/381.14.mp3' },
        { id: 3, text: ' р ', isActive: true, error: 0, type: 'word', answer: 0, audio: 'Task14/382.14.mp3' },
        { id: 4, text: ' в ', isActive: true, error: 0, type: 'word', answer: 0, audio: 'Task14/383.14.mp3' },
        { id: 5, text: ' д ', isActive: true, error: 0, type: 'word', answer: 2, audio: 'Task14/384.14.mp3' },
        { id: 6, text: ' у ', isActive: true, error: 0, type: 'word', answer: 0, audio: 'Task14/385.14.mp3' }
    ],
    [
        { id: 1, isActive: true, error: 0, type: 'sound', answer: 0, audio: 'Task14/384.14.mp3' },
        { id: 2, isActive: true, error: 0, type: 'sound', answer: 1, audio: 'Task14/386.14.mp3' },
        { id: 3, isActive: true, error: 0, type: 'sound', answer: 2, audio: 'Task14/387.14.mp3' },
        { id: 4, isActive: true, error: 0, type: 'sound', answer: 0, audio: 'Task14/380.14.mp3' }
    ]
];

const dataAnswer = [
    {
        id: 1,
        img: 'Task14/б.png',
        word: { id: 1, text: ' б ', isActive: false, error: 0, type: 'word' },
        sound: { id: 1, text: 'р', isActive: false, error: 0, type: 'sound' }
    },
    {
        id: 2,
        img: 'Task14/д.png',
        word: { id: 2, text: ' д ', isActive: false, error: 0, type: 'word' },
        sound: { id: 2, text: 'р', isActive: false, error: 0, type: 'sound' }
    }
];

export { dataTask, dataAnswer };