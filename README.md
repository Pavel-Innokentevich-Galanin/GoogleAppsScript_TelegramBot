## Введение

Буду создавать скрипт по отправке сообщений в телеграм,
который не будет запускаться через NodeJS,
ибо будет работать в Google Apps Scripts.

Плюсы:
- это бесплатно
- не нужно иметь машину с утановленой NodeJS
- можно выполнять скрипт удаленно

Минусы:
- нельзя использовать npm пакеты (нужно писать код самому)
- не работает `new URLSearchParams(data)` - нужно реализовывать самому
- чтобы запустить код, то нужно постучаться по ссылке
- чтобы выполнить скрипт, нужно постучаться по ссылке:
    - `https://script.google.com/macros/s/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/exec`

## Как запустить код

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
        - `token` - токен бота телеграм (можно создать через бота [BotFather](https://t.me/BotFather))
        - `authorId` - ид пользователя, которому будет писать бот (можно узнать через бота [getmyid_bot](https://t.me/getmyid_bot))
1. Проверяю работу скрипта:
    1. Жму `Выполнить`.
    1. Ура, работает!

## Как получить ссылку, чтобы выполнять код удаленно

На странице с кодом (файлом `Код.gs`) делаем следующие:
1. Жму `Начать развертывание`.
1. Жму `Новое развертывание`.
1. Жму на шестренку у текста `Выберите тип`.
1. Жму `Веб-приложение`.
    - Описание: `Лекции АИС`
    - Веб-приложение: `От моего имени`
    - У кого есть доступа: `Все`
1. Копирую ссылку URL:
    - `https://script.google.com/macros/s/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/exec`
1. Запускаю ссылку
1. Ура, работает!

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

1 directory, 4 files
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
