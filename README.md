# Voice Me — демо-сайт

Локальный пример лендинга с фейковыми данными.

## Запуск локально

```bash
npm install
npm run dev
```

Откроется [http://localhost:5173](http://localhost:5173)

## Выложить в сеть (для друга)

Есть два простых бесплатных варианта.

### Вариант A — Vercel (быстрее всего, рекомендую)

1. Залей проект на GitHub (см. ниже) **или** деплой прямо с компьютера:
   ```bash
   npx vercel
   ```
2. Следуй подсказкам в терминале (логин через браузер).
3. Получишь ссылку вида `https://voice-me-xxxx.vercel.app` — её и кидай другу.

Продакшн-деплой:
```bash
npx vercel --prod
```

### Вариант B — GitHub Pages

1. Создай репозиторий на GitHub, например `voice-me`.
2. Залей код:
   ```bash
   git init
   git add .
   git commit -m "Voice Me demo landing"
   git branch -M main
   git remote add origin https://github.com/ТВОЙ_ЮЗЕР/voice-me.git
   git push -u origin main
   ```
3. На GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. После пуша Actions сам соберёт сайт. Ссылка будет:
   `https://ТВОЙ_ЮЗЕР.github.io/voice-me/`

Workflow уже лежит в [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

## Что внутри

- Одностраничный лендинг: Hero, Услуги, Кейсы, О нас, Процесс, FAQ, Форма
- Тёмный editorial-стиль по референсам
- Аудиоплееры в кейсах (демо-звук)
- Форма заявки с мок-API (в консоли сервера видно отправку)

## Фейковые данные

Все контакты, клиенты и кейсы вымышленные. Реальный Instagram: [@voice_____me](https://www.instagram.com/voice_____me/).

Контент правится в [`src/data/content.js`](src/data/content.js).

## Бриф для заказчика

PDF: [`BRIEF.pdf`](BRIEF.pdf)
