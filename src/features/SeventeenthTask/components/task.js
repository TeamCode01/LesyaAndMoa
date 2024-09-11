import draggable from "vuedraggable";

const dataFirstTask = [
    [
        [
            { id: 1, isActive: true, draggable: true, answer: 14, src: '/assets/creatures/SeventeenthTask/figure-in-ro.png', class: 'figure-in', text: 'РО', error: 0, srcError: '/assets/creatures/SeventeenthTask/wrong/figure-in-ro-wrong.png', srcRight: '/assets/creatures/SeventeenthTask/right/figure-in-ro-right.png' },
            { id: 2, isActive: true, draggable: true, answer: 9, src: '/assets/creatures/SeventeenthTask/figure-out-laka.png', class: 'figure-out', text: 'ЛАКА', error: 0, srcError: '/assets/creatures/SeventeenthTask/wrong/figure-out-laka-wrong.png', srcRight: '/assets/creatures/SeventeenthTask/right/figure-out-laka-right.png' },
            { id: 3, isActive: true, draggable: true, answer: 6, src: '/assets/creatures/SeventeenthTask/figure-out-koro.png', class: 'figure-out', text: 'КОРО', error: 0, srcError: '/assets/creatures/SeventeenthTask/wrong/figure-out-koro-wrong.png', srcRight: '/assets/creatures/SeventeenthTask/right/figure-out-koro-right.png' },
            { id: 4, isActive: true, draggable: true, answer: 11, src: '/assets/creatures/SeventeenthTask/figure-in-vo.png', class: 'figure-in', text: 'ВО', error: 0, srcError: '/assets/creatures/SeventeenthTask/wrong/figure-in-vo-wrong.png', srcRight: '/assets/creatures/SeventeenthTask/right/figure-in-vo-right.png' },
            { id: 5, isActive: true, draggable: true, answer: 8, src: '/assets/creatures/SeventeenthTask/figure-in-ka.png', class: 'figure-in', text: 'КА', error: 0, srcError: '/assets/creatures/SeventeenthTask/wrong/figure-in-ka-wrong.png', srcRight: '/assets/creatures/SeventeenthTask/right/figure-in-ka-right.png' }
        ],
        [
            { id: 6, isActive: true, draggable: true, answer: 3, src: '/assets/creatures/SeventeenthTask/figure-in-va.png', class: 'figure-in', text: 'ВА', error: 0, srcError: '/assets/creatures/SeventeenthTask/wrong/figure-in-va-wrong.png', srcRight: '/assets/creatures/SeventeenthTask/right/figure-in-va-right.png' },
            { id: 7, isActive: true, draggable: true, answer: 0, src: '/assets/creatures/SeventeenthTask/figure-out-so.png', class: 'figure-out', text: 'СО', error: 0, srcError: '/assets/creatures/SeventeenthTask/wrong/figure-out-so-wrong.png', srcRight: '/assets/creatures/SeventeenthTask/right/figure-out-so-right.png' },
            { id: 8, isActive: true, draggable: true, answer: 5, src: '/assets/creatures/SeventeenthTask/figure-out-re.png', class: 'figure-out', text: 'РЕ', error: 0, srcError: '/assets/creatures/SeventeenthTask/wrong/figure-out-re-wrong.png', srcRight: '/assets/creatures/SeventeenthTask/right/figure-out-re-right.png' },
            { id: 9, isActive: true, draggable: true, answer: 2, src: '/assets/creatures/SeventeenthTask/figure-in-ob.png', class: 'figure-in', text: 'ОБ', error: 0, srcError: '/assets/creatures/SeventeenthTask/wrong/figure-in-ob-wrong.png', srcRight: '/assets/creatures/SeventeenthTask/right/figure-in-ob-right.png' }
        ],
        [
            { id: 10, isActive: true, draggable: true, answer: 0, src: '/assets/creatures/SeventeenthTask/figure-in-ba.png', class: 'figure-in', text: 'БА', error: 0, srcError: '/assets/creatures/SeventeenthTask/wrong/figure-in-ba-wrong.png', srcRight: '/assets/creatures/SeventeenthTask/right/figure-in-ba-right.png' },
            { id: 11, isActive: true, draggable: true, answer: 4, src: '/assets/creatures/SeventeenthTask/figure-out-dere.png', class: 'figure-out', text: 'ДЕРЕ', error: 0, srcError: '/assets/creatures/SeventeenthTask/wrong/figure-out-dere-wrong.png', srcRight: '/assets/creatures/SeventeenthTask/right/figure-out-dere-right.png' },
            { id: 12, isActive: true, draggable: true, answer: 0, src: '/assets/creatures/SeventeenthTask/figure-out-ta.png', class: 'figure-out', text: 'ТА', error: 0, srcError: '/assets/creatures/SeventeenthTask/wrong/figure-out-ta-wrong.png', srcRight: '/assets/creatures/SeventeenthTask/right/figure-out-ta-right.png' },
            { id: 13, isActive: true, draggable: true, answer: 0, src: '/assets/creatures/SeventeenthTask/figure-in-mu.png', class: 'figure-in', text: 'МУ', error: 0, srcError: '/assets/creatures/SeventeenthTask/wrong/figure-in-mu-wrong.png', srcRight: '/assets/creatures/SeventeenthTask/right/figure-in-mu-right.png' },
            { id: 14, isActive: true, draggable: true, answer: 1, src: '/assets/creatures/SeventeenthTask/figure-out-mashka.png', class: 'figure-out', text: 'МАШКА', error: 0, srcError: '/assets/creatures/SeventeenthTask/wrong/figure-out-mashka-wrong.png', srcRight: '/assets/creatures/SeventeenthTask/right/figure-out-mashka-right.png' }
        ]
    ],
    [
        { id: 1, text: 'Ромашка', isActive: false }, { id: 2, text: 'Дерево', isActive: false }, { id: 3, text: 'Корова', isActive: false }, { id: 4, text: 'Река', isActive: false }, { id: 5, text: 'Облака', isActive: false }
    ]
];

const dataSecondTask = [
    [
        { id: 1, text: 'РОМАШКА', isActive: false }, { id: 2, text: 'ДЕРЕВО', isActive: false }, { id: 3, text: 'КОРОВА', isActive: false }, { id: 4, text: 'РЕКА', isActive: false }, { id: 5, text: 'ОБЛАКА', isActive: false }
    ],
    [
        { id: 1, src: '/assets/creatures/SeventeenthTask/tree.png', alt: 'tree', endsrc: '/assets/creatures/SeventeenthTask/daisy.png', endalt: 'daisy', },
        { id: 2, src: '/assets/creatures/SeventeenthTask/daisy.png', alt: 'daisy', endsrc: '/assets/creatures/SeventeenthTask/tree.png', endalt: 'tree', },
        { id: 3, src: '/assets/creatures/SeventeenthTask/cloud.png', alt: 'cloud', endsrc: '/assets/creatures/SeventeenthTask/cow.png', endalt: 'cow', },
        { id: 4, src: '/assets/creatures/SeventeenthTask/cow.png', alt: 'cow', endsrc: '/assets/creatures/SeventeenthTask/river.png', endalt: 'river', },
        { id: 5, src: '/assets/creatures/SeventeenthTask/river.png', alt: 'river', endsrc: '/assets/creatures/SeventeenthTask/cloud.png', endalt: 'cloud', }
    ]
];

export { dataFirstTask, dataSecondTask };