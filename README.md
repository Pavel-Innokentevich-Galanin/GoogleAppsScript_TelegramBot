## Введение

Создам бота, которому можно слать сообщение,
а он будет тебе отвечать.
Бот будет работать без NodeJS.
Бот будет запушен с помощью хука.
Когда боту будет приходить сообщение,
то бот будет отправлять POST запрос на Google Apps Scripts.
Мы этот POST запрос будет обрабатывать и отвечать пользователю.

Дальше уже дело творческое.

Плюсы:
- это бесплатно
- не нужно иметь машину с утановленой NodeJS

Минусы:
- нельзя использовать npm пакеты (нужно писать код самому)
- когда редактируешь код то, чтобы заставить бота выполнять новый код,
    то нужно генерировать новую ссылку в Google Apps Script
    и с помощью Postman отправлять запрос
    на API телеграма `setWebhook`,
    в теле запроса которого указывать новую ссылку
    - `https://script.google.com/macros/s/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/exec`

## Как загрузить этот код на Google Apps Script

Создаем проект:
1. Заходим на [Google Apps Scripts](https://script.google.com/home).
1. Жмем `Создать проект`.
1. Переименовываю проект:
    - Жму `Проект без названия`.
    - Пишу `Лекции АИС`.
1. В файл `Код.gs` пишем код:
    1. Вставляю в файл `Код.js` код [src/Код.gs](src/%D0%9A%D0%BE%D0%B4.gs).
1. Создаем файл `env.html` (аналог файла .env):
    1. Жму `+`.
    1. Жму `HTML`.
    1. Ввожу название `env`.
    1. Вставляю в файл `env.html` код [src/env.html](src/env.html).
    1. В env файле (`env.html`) нужно поменять следующие параметры:
        - `telegram_bot_token` - токен бота телеграм (можно создать через бота [BotFather](https://t.me/BotFather))

Как получить ссылку на проект:
1. Заходим на страницу с нашим кодом (файлом `Код.gs`)
1. Жму `Начать развертывание`.
1. Жму `Новое развертывание`.
1. Жму на шестренку у текста `Выберите тип`.
1. Жму `Веб-приложение`.
    - Описание: `Лекции АИС`
    - Веб-приложение: `От моего имени`
    - У кого есть доступа: `Все`
1. Копирую ссылку URL:
    - `https://script.google.com/macros/s/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/exec`

Как зацепить бота по ссылке:
1. Запускаем POST по url `https://api.telegram.org/bot<тут_токен_бота>/setWebhook`
    В теле запроса указываем следующее:

    ```
    {
        "url": "https://script.google.com/macros/s/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/exec"
    }
    ```

Пиши своему боту. Он работает! Ура!

## Структура проекта

```bash
sudo apt update
sudo apt install tree
tree --charset ascii -a -I ".git"
```

```
.
|-- LICENSE             # лицензия репозитория
|-- .prettierignore     # на какие файлы не работает выравнивание кода
|-- .prettierrc.json    # выравнивание кода расширением Prettier в VS Code
|-- README.md           # инструкция репозитория
`-- src                 # папка с кодом
    |-- env.html        # файл с секретами (аналог .env)
    `-- Код.gs          # стартовый файл Google Script (аналог main.js)

1 directory, 6 files
```

## Список использованных источников:
1. Мои проекты - Скрипт приложений Google Apps
    [Электронный ресурс] -
    Режим доступа:
    https://script.google.com/home.
    Дата доступа:
    14.02.2023.
1. Swagger UI
    [Electronic resource] -
    Mode of access:
    https://telegram-bot-api.vercel.app.
    Date of access:
    14.02.2023.
1. Telegram Bot API
    [Electronic resource] -
    Mode of access:
    https://core.telegram.org/bots/api/#sendmessage.
    Date of access:
    14.02.2023.
1. Download Postman | Get Started for Free
    [Electronic resource] -
    Mode of access:
    https://www.postman.com/downloads.
    Date of access:
    14.02.2023.
