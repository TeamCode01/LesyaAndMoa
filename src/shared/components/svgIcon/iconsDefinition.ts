export type IconName =
    | 'download'
    | 'file-dock'
    | 'wrap'
    | 'user-avatar'
    | 'add-file'
    | 'arrow-down'
    | 'arrow-right'
    | 'basket'
    | 'bell-light'
    | 'calendar'
    | 'close-location'
    | 'close-modal'
    | 'commandir'
    | 'commisar'
    | 'cross'
    | 'dashboard-active'
    | 'dashboard-disabled'
    | 'file'
    | 'group-light'
    | 'link-ref'
    | 'mail'
    | 'people'
    | 'phone'
    | 'search'
    | 'telegram'
    | 'share-link'
    | 'vk'
    | 'file-pdf'
    | 'file-jpg'
    | 'file-png'
    | 'upside-down-arrow'
    | 'filter'
    | 'add-icon'




    // Здесь начались иконки для Леси и Моа
    | '1TCLUB'
    | 'arrow-left'
    | 'Arrow'
    | 'arrows'
    | 'basil--viber-solid'
    | 'block'
    | 'brandico--odnoklassniki-rect'
    | 'close-icon'
    | 'comma-blue'
    | 'comma'
    | 'done'
    | 'eye-hidden'
    | 'eye-show'
    | 'full-stop-blue'
    | 'full-stop'
    | 'hand'
    | 'icon-close'
    | 'icon-pink'
    | 'icons-chevron'
    | 'link_copy_icon'
    | 'logos--telegram'
    | 'logos--whatsapp'
    | 'muted'
    | 'play'
    | 'playGame'
    | 'quastion'
    | 'refresh'
    | 'repeat'
    | 'ri--vk-fill'
    | 'sound'
    | 'speaker-violet'
    | 'speaker'
    | 'TimerIcon'
    | 'vector'
    | 'YouTube'
    | "green-circle"
    ;


type IconsRecord = Record<
    IconName,
    { width: number; height: number; color: string }
>;

export const defaultIconSizes: IconsRecord = {
    download: {
        width: 24,
        height: 24,
        color: '#1F7CC0',
    },
    'file-dock': {
        color: '#33363F',
        width: 24,
        height: 24,
    },
    wrap: {
        width: 32,
        height: 32,
        color: '#1F7CC0',
    },
    'user-avatar': {
        width: 56,
        height: 56,
        color: '#35383F',
    },
    'add-file': {
        width: 16,
        height: 17,
        color: '#1F7CC0',
    },
    'arrow-down': {
        width: 24,
        height: 24,
        color: '#ffffff',
    },
    'arrow-right': {
        width: 24,
        height: 24,
        color: '#ffffff',
    },
    basket: {
        width: 24,
        height: 24,
        color: '#1F7CC0',
    },
    'bell-light': {
        width: 36,
        height: 36,
        color: '#35383F',
    },
    calendar: {
        width: 20,
        height: 21,
        color: '#35383F',
    },
    'close-location': {
        width: 24,
        height: 24,
        color: '#939393',
    },
    'close-modal': {
        width: 24,
        height: 24,
        color: '#898989',
    },
    commandir: {
        width: 18,
        height: 18,
        color: '#FFFF00',
    },
    commisar: {
        width: 18,
        height: 18,
        color: '#FFFF00',
    },
    cross: {
        width: 32,
        height: 32,
        color: '#898989',
    },
    'dashboard-active': {
        width: 32,
        height: 32,
        color: '#ffffff',
    },
    'dashboard-disabled': {
        width: 32,
        height: 32,
        color: '#35383F',
    },
    file: {
        width: 24,
        height: 24,
        color: '#35383F',
    },
    'group-light': {
        width: 24,
        height: 24,
        color: '#35383F',
    },
    'link-ref': {
        width: 16,
        height: 16,
        color: '#1F7CC0',
    },
    mail: {
        width: 19,
        height: 13,
        color: '#35383F',
    },
    people: {
        width: 24,
        height: 24,
        color: '#6A6A6A',
    },
    phone: {
        width: 18,
        height: 19,
        color: '#35383F',
    },
    search: {
        width: 18,
        height: 18,
        color: '#898989',
    },
    telegram: {
        width: 26,
        height: 26,
        color: '#1F7CC0',
    },
    'share-link': {
        width: 24,
        height: 24,
        color: '#1F7CC0',
    },
    vk: {
        width: 24,
        height: 24,
        color: '#1F7CC0',
    },
    'file-pdf': {
        width: 48,
        height: 24,
        color: '#ff8a00',
    },
    'file-jpg': {
        width: 48,
        height: 24,
        color: '#16a086',
    },
    'file-png': {
        width: 48,
        height: 24,
        color: '#16a086',
    },
    'upside-down-arrow': {
        width: 20,
        height: 20,
        color: '#35383f',
    },
    filter: {
        width: 24,
        height: 24,
        color: '#35383F',
    },
    'add-icon': {
        width: 24,
        height: 24,
        color: '#1f7cc0',
    },




    // Здесь начилаются иконки для Леси и Моа



    '1TCLUB': {
        width: 185,
        height: 19,
        color: '#1F7CC0',
    },
    'arrow-left': {
        width: 40,
        height: 40,
        color: '#1F7CC0',
    },
    'Arrow': {
        width: 29,
        height: 20,
        color: '#FFFFFF',
    },
    'arrows': {
        width: 14,
        height: 17,
        color: '#313131',
    },
    'basil--viber-solid': {
        width: 16,
        height: 16,
        color: '#8000ff',
    },
    'block': {
        width: 9,
        height: 10,
        color: '#A5ACB1',
    },
    'brandico--odnoklassniki-rect': {
        width: 16,
        height: 16,
        color: '#ff8040',
    },
    'close-icon': {
        width: 30,
        height: 30,
        color: '#7D7D7D',
    },
    'comma-blue': {
        width: 11,
        height: 52,
        color: '#4E3B7F',
    },
    'comma': {
        width: 11,
        height: 52,
        color: '#D2EFFF',
    },
    'done': {
        width: 10,
        height: 8,
        color: '#5CCF54',
    },
    'eye-hidden': {
        width: 16,
        height: 16,
        color: '#818181',
    },
    'eye-show': {
        width: 16,
        height: 16,
        color: '#818181',
    },
    'full-stop-blue': {
        width: 10,
        height: 10,
        color: '#4E3B7F',
    },
    'full-stop': {
        width: 10,
        height: 10,
        color: '#D2EFFF',
    },
    'hand': {
        width: 66,
        height: 64,
        color: '#FFFFFF',
    },
    'icon-close': {
        width: 24,
        height: 24,
        color: '#5CCF54',
    },
    'icon-pink': {
        width: 40,
        height: 40,
        color: '#FFFFFF',
    },
    'icons-chevron': {
        width: 24,
        height: 24,
        color: '#313131',
    },
    'link_copy_icon': {
        width: 32,
        height: 32,
        color: '#FFFFFF',
    },
    'logos--telegram': {
        width: 16,
        height: 16,
        color: '#229ED9',
    },
    'logos--whatsapp': {
        width: 16,
        height: 16,
        color: '#F9F9F9',
    },
    'muted': {
        width: 40,
        height: 40,
        color: '#313131',
    },
    'play': {
        width: 8,
        height: 10,
        color: '#00B6F2',
    },
    'playGame': {
        width: 20,
        height: 20,
        color: '#313131',
    },
    'quastion': {
        width: 14,
        height: 25,
        color: '#4E3B7F',
    },
    'refresh': {
        width: 27,
        height: 34,
        color: '#FFFFFF',
    },
    'repeat': {
        width: 26.799805,
        height: 34.038574,
        color: '#0D47AA',
    },
    'ri--vk-fill': {
        width: 16,
        height: 16,
        color: '#0080FF',
    },
    'sound': {
        width: 26,
        height: 26,
        color: '#313131',
    },
    'speaker-violet': {
        width: 32,
        height: 32,
        color: '#4E3B7F',
    },
    'speaker': {
        width: 26,
        height: 26,
        color: '#0D47AA',
    },
    'TimerIcon': {
        width: 30,
        height: 52,
        color: '#D5E1FF',
    },
    'vector': {
        width: 28,
        height: 20,
        color: '#FFFFFF',
    },
    'YouTube': {
        width: 32,
        height: 33,
        color: '#E237A7',
    },

    "green-circle": {
        width: 16,
        height: 16,
        color: '#5CCF54',
    },

};
