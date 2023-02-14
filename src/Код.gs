// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

/**
 * Эта функция-кастыль, чтобы работала кнопка "Выполнить" в Google Apps Script
 * @return Функция не возвращает ничего (undefined).
 */
function myFunction() {}

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

/**
 * Эта функция которую будет вызывать бот, когда ему пришлют сообщение
 * @return Функция не возвращает ничего (undefined).
 */
function doPost(e = {}) {
  const envJsonText =
    HtmlService.createHtmlOutputFromFile('env.html').getContent();
  const env = JSON.parse(envJsonText);

  const user_data = JSON.parse(e.postData.contents);
  const user_message_id = user_data.message.message_id;
  const user_message = user_data.message.text;
  const user_id = user_data.message.from.id;
  const user_first_name = user_data.message.from.first_name;
  const user_last_name = user_data.message.from.last_name;
  const user_username = user_data.message.from.username;

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

  sendMessage(token, chat_id, text, params);
}

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

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

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
