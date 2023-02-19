/**
 * Эта функция-кастыль, чтобы работала кнопка "Выполнить" в Google Apps Script
 * @return Функция не возвращает ничего (undefined).
 */
function myFunction() {
  console.log('Ты нажал кнопку "Выполнить" в Google Apps Script');
}

/**
 * Функция возвращает секреты env
 * @returns Функция возвращает Java Script объект
 */
function getEnv() {
  const envJsonText =
    HtmlService.createHtmlOutputFromFile('env.html').getContent();
  const env = JSON.parse(envJsonText);
  return env;
}

/**
 * Функция, которая будет вызываться, когда открываем приложение по ссылке
 * @returns Функция возвращает JSON (object)
 */
function doGet(e = {}) {
  const env = getEnv();

  const ss = SpreadsheetApp.openById(env.google_table_id);
  const GetLogsTable = ss.getSheetByName('GET_logs');
  GetLogsTable.appendRow([new Date(), e]);

  const data = {
    message: 'Приложение работает',
    more: {
      data: e,
    },
  };
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON
  );
}

/**
 * Эта функция которую будет вызывать бот, когда ему пришлют сообщение
 * @return Функция не возвращает ничего (undefined).
 */
function doPost(e = {}) {
  const env = getEnv();

  const ss = SpreadsheetApp.openById(env.google_table_id);
  const PostLogsTable = ss.getSheetByName('POST_logs');
  PostLogsTable.appendRow([new Date(), e]);

  try {
    const user_data = JSON.parse(e.postData.contents);
    PostLogsTable.appendRow([new Date(), e, user_data]);
    const user_message_id = user_data.message.message_id;
    const user_message = user_data.message.text;
    const user_id = user_data.message.from.id;
    const user_first_name = user_data.message.from.first_name;
    const user_last_name = user_data.message.from.last_name;
    const user_username = user_data.message.from.username;
    const user_text = user_data.message.text;

    const token = env.telegram_bot_token;
    const chat_id = user_id;
    let text = '';
    text += `<b>Твоё имя</b>: ${user_first_name}. \n`;

    if (user_last_name) {
      text += `<b>Твоя фамилия</b>: ${user_last_name}. \n`;
    }

    if (user_username) {
      text += `<b>Твоя ссылка</b>: @${user_username}. \n`;
      text += `https://t.me/${user_username} \n`;
    }

    text += `--- \n`;
    text += `<b>Ты мне написал</b>: \n`;
    text += `${user_message} \n`;
    text += `--- \n`;
    text += `<b>Данные, которые пришли на Google Apps Script</b>: \n`;
    text += `<pre>${JSON.stringify(user_data, null, 2)}</pre> \n`;

    const params = {
      reply_to_message_id: user_message_id,
      disable_web_page_preview: true,
      parse_mode: 'HTML',
    };

    const messagesTable = ss.getSheetByName('messages');
    messagesTable.appendRow([
      new Date(),
      user_id,
      user_first_name,
      user_last_name,
      user_username,
      user_text,
    ]);

    sendMessage(token, chat_id, text, params);
  } catch (err) {
    const PostErrorsTable = ss.getSheetByName('POST_err');
    PostErrorsTable.appendRow([new Date(), e, err]);
  }
}

/**
 * Функция отправляет сообщение в телеграм
 * @param {string} token - токен телеграм бота
 * @param {number} chat_id - ид чата, в который слать сообщение боту
 * @param {string} text - сообщение, которое напишет бот
 * @return Функция не возвращает ничего (undefined).
 */
function sendMessage(token, chat_id, text, params = {}) {
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  const data = {
    chat_id,
    text,
    ...params,
  };

  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(data),
  };

  UrlFetchApp.fetch(url, options);
}
