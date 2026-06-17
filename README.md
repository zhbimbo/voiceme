# VOICE ME

Демо-сайт дикторского агентства: лендинг с каталогом услуг, дикторов и кейсов.

**Демо:** [zhbimbo.github.io/voiceme](https://zhbimbo.github.io/voiceme/)

## О проекте

VOICE ME — студия озвучки и аудио-продакшна. Сайт показывает услуги, голоса, портфолио и принимает заявки.

Стек: HTML, CSS, vanilla JS, Vite. SPA-роутинг без фреймворков.

### Структура

| Раздел | Описание |
|--------|----------|
| Hero | Логотип, анимация появления, блок «Кто мы» |
| Услуги | Аудиокниги, реклама, аудиогиды, музыка → страницы с процессом и прайсом |
| Дикторы | Каталог голосов с тегами и аудио-сэмплами |
| Кейсы | Книга, спектакль, реклама, музыка |
| Почему мы | Преимущества студии |
| Клиенты | Логотипы издательств |
| Отзывы | Цитаты клиентов |
| Контакты | Форма, карта, каналы связи |

Внутренние страницы: `/services/:slug`, `/speakers`, `/speakers/:slug`, `/cases/:slug`.

## Запуск локально

```bash
npm install
npm run dev
```

Сайт откроется на [http://localhost:5173](http://localhost:5173).

Сборка:

```bash
npm run build
npm run preview
```

## Деплой

Продакшн-сборка публикуется на **GitHub Pages** через Actions.

1. Push в ветку `main`
2. **Settings → Pages → Source: GitHub Actions**
3. Workflow: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)

Base path для Pages задаётся через `VITE_BASE` в workflow (по умолчанию `/voiceme/`).

## Контент

Все тексты, контакты и кейсы в демо — вымышленные. Редактирование: [`src/data/content.js`](src/data/content.js).

Реальный Instagram: [@voice_____me](https://www.instagram.com/voice_____me/).

## Документация

Бриф проекта: [`BRIEF.pdf`](BRIEF.pdf)
