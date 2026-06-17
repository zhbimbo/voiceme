export const site = {
  name: 'VOICE ME',
  tagline: 'Озвучиваем идеи. Собираем звук. Делаем ролики.',
  description:
    'VOICE ME — студия озвучки и аудио-продакшна. Реклама, ролики, музыка, монтаж. Русский и английский.',
  city: 'Москва',
  phone: '+7 (900) 123-45-67',
  phoneRaw: '+79001234567',
  contactName: 'Менеджер',
  instagram: 'https://www.instagram.com/voice_____me/',
  instagramHandle: '@voice_____me',
  telegram: 'https://t.me/voice_me_demo',
  telegramHandle: '@voice_me_demo',
  email: 'hello@voiceme.demo',
  responseTime: '24 часов',
  demo: true,
};

export const services = [
  {
    id: 'voiceover',
    title: 'Дикторское озвучивание',
    description: 'Реклама, ролики, презентации. Русский и английский.',
    icon: '01',
  },
  {
    id: 'music',
    title: 'Музыкальное оформление',
    description: 'Саунд-дизайн и музыка под ваш ролик или бренд.',
    icon: '02',
  },
  {
    id: 'mixing',
    title: 'Сведение и мастеринг',
    description: 'Чистый, плотный звук для любых платформ.',
    icon: '03',
  },
  {
    id: 'correction',
    title: 'Коррекция голоса',
    description: 'Убираем шумы, выравниваем тон, делаем голос уверенным.',
    icon: '04',
  },
  {
    id: 'arrangement',
    title: 'Аранжировка',
    description: 'Оркестровка, биты и аранжировка под задачу.',
    icon: '05',
  },
  {
    id: 'video',
    title: 'Видеомонтаж',
    description: 'Монтаж роликов под озвучку и музыкальное оформление.',
    icon: '06',
  },
  {
    id: 'writing',
    title: 'Сочинение текстов',
    description: 'Сценарии, тексты для рекламы и озвучки.',
    icon: '07',
  },
  {
    id: 'recording',
    title: 'Запись в студии',
    description: 'Профессиональная запись голоса и инструментов.',
    icon: '08',
  },
];

const demoAudio = [
  'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3',
  'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/gong-1.mp3',
  'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/gong-2.mp3',
  'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3',
  'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/gong-1.mp3',
  'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/gong-2.mp3',
];

export const cases = [
  {
    id: 'nova',
    client: 'Nova Brand',
    type: 'Реклама',
    result: 'Озвучили 30-секундный ролик для запуска новой линейки.',
    audio: demoAudio[0],
    duration: '0:30',
  },
  {
    id: 'pixel',
    client: 'Pixel Ads',
    type: 'Озвучка',
    result: 'Голос для промо IT-продукта — уверенный, современный тон.',
    audio: demoAudio[1],
    duration: '0:28',
  },
  {
    id: 'stream',
    client: 'Stream TV',
    type: 'Музыка',
    result: 'Музыкальное оформление и сведение шоу-рила.',
    audio: demoAudio[2],
    duration: '0:45',
  },
  {
    id: 'urban',
    client: 'Urban Cafe',
    type: 'Реклама',
    result: 'Тёплая дикторская подача для сезонного меню.',
    audio: demoAudio[3],
    duration: '0:24',
  },
  {
    id: 'wave',
    client: 'Wave Agency',
    type: 'Видео',
    result: 'Полный продакшн: озвучка, музыка и монтаж.',
    audio: demoAudio[4],
    duration: '0:38',
  },
  {
    id: 'global',
    client: 'Global Pitch',
    type: 'Английский',
    result: 'Демо англоязычного диктора для международного питча.',
    audio: demoAudio[5],
    duration: '0:30',
  },
];

export const clients = ['Nova Brand', 'Pixel Ads', 'Stream TV', 'Urban Cafe', 'Wave Agency'];

export const process = [
  {
    step: '01',
    title: 'Заявка и бриф',
    description: 'Рассказываете задачу, сроки и референсы. Мы уточняем детали.',
  },
  {
    step: '02',
    title: 'Подбор голоса',
    description: 'Предлагаем варианты голоса, тон и концепцию звука.',
  },
  {
    step: '03',
    title: 'Запись и продакшн',
    description: 'Записываем, сводим, монтируем. Показываем промежуточный результат.',
  },
  {
    step: '04',
    title: 'Сдача файлов',
    description: 'Отдаём финальные файлы в нужных форматах. Готово к публикации.',
  },
];

export const faq = [
  {
    question: 'Что такое VOICE ME?',
    answer:
      'VOICE ME — креативная команда в сфере аудио и видео: от рекламных роликов до полноценного продакшна.',
  },
  {
    question: 'Какие услуги вы предоставляете?',
    answer:
      'Озвучивание, музыкальное оформление, сведение и мастеринг, коррекция голоса, аранжировка, видеомонтаж, тексты и студийная запись.',
  },
  {
    question: 'Какие сроки выполнения?',
    answer:
      'Простая озвучка — от 1–2 дней. Комплексный продакшн — от 5–7 дней. Срочные задачи обсуждаем отдельно.',
  },
  {
    question: 'На каких языках озвучиваете?',
    answer: 'Русский и английский. Другие языки — по запросу.',
  },
  {
    question: 'Как происходит оплата?',
    answer: '50% предоплата при старте, 50% после сдачи.',
  },
  {
    question: 'Можно ли работать удалённо?',
    answer: 'Да. Работаем с клиентами по всей России и за рубежом.',
  },
  {
    question: 'Сколько стоят услуги?',
    answer: 'Стоимость зависит от задачи. Оставьте заявку — рассчитаем в течение суток.',
  },
];

export const serviceOptions = services.map((s) => s.title);
