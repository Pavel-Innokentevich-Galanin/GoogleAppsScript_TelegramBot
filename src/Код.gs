// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

/**
 * Эта функция-кастыль, чтобы работала кнопка "Выполнить" в Google Apps Script
 * Функция main вызовется и без функции myFunction, если мы вызываем по ссылке или запускаем по кнопке "Выполнить"
 * @return Функция не возвращает ничего (undefined).
 */
function myFunction() {}

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

// Читаю текст с файла .env (env.html)
const envJsonText =
  HtmlService.createHtmlOutputFromFile('env.html').getContent();

// Преобразую текст в JavaScript объект
const env = JSON.parse(envJsonText);

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

/**
 * Основная функция
 * @return Функция не возвращает ничего (undefined).
 */
function main() {
  console.log('Это данные env взятые из файла env.html (аналог файла .env):');
  console.log(JSON.stringify(env, null, 2));

  const time = getTime();
  const token = env.token;
  const chat_id = env.authorId;
  const text = `Эй, ты. (${time})`;
  sendMessage(token, chat_id, text);
}
main();

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

/**
 * Функция возвращает строку с текущим временем и датой
 * @return Возвращает string - это дата в формате YYYY-MM-DD_hh-mm-ss
 */
function getTime() {
  const d = new Date();

  const d_y = d.getFullYear();

  let d_m = d.getMonth();
  d_m = d_m < 10 ? `0${d_m}` : `${d_m}`;

  let d_d = d.getDate();
  d_d = d_d < 10 ? `0${d_d}` : `${d_d}`;

  let d_h = d.getHours();
  d_h = d_h < 10 ? `0${d_h}` : `${d_h}`;

  let d_mi = d.getMinutes();
  d_mi = d_mi < 10 ? `0${d_mi}` : `${d_mi}`;

  let d_s = d.getSeconds();
  d_s = d_s < 10 ? `0${d_s}` : `${d_s}`;

  const result = `${d_y}-${d_m}-${d_d}_${d_h}-${d_mi}-${d_s}`;

  return result;
}

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

/**
 * Функция генерирует атрибуты в ссылки из объекта data
 * Эта функция аналогична классу new URLSearchParams(data);
 * Класс URLSearchParams не работает в Google Apps Script
 * @param {object} data - атрибуты, которые хотим поместить в ссылку
 * @return Возврачает string - это ссылка вида ?ключ1=значени1&ключ2=значение2
 */
function createQuery(data = {}) {
  const keys = Object.keys(data);
  let query = '?';

  const lengthMinus1 = keys.length - 1;

  for (let i = 0; i < lengthMinus1; i++) {
    const key = keys[i];
    const value = data[key];
    query += `${key}=${value}&`;
  }

  const key = keys[lengthMinus1];
  const value = data[key];
  query += `${key}=${value}`;

  return query;
}

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

/**
 * Функция отправляет сообщение в телеграм
 * @param {string} token - токен телеграм бота
 * @param {number} chat_id - ид чата, в который слать сообщение боту
 * @param {string} text - сообщение, которое напишет бот
 * @return Функция не возвращает ничего (undefined).
 */
function sendMessage(token, chat_id, text) {
  // Создаю объект с данными в URL
  const data = {
    chat_id,
    text,
  };

  // Разбиваю объект на парметры в URL (?ключ1=значение1&ключ2=значение2&ключ3=значение3)
  const query = createQuery(data);

  // Создаю URL из токена и параметров
  const url = `https://api.telegram.org/bot${token}/sendMessage${query}`;

  console.log("Отправлено сообщение методом POST следующим URL'ом");
  console.log(url);

  // Объект с настройками для UrlFetchApp.fetch
  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(data),
  };

  // Выполняю запрос API запрос
  const response = UrlFetchApp.fetch(url, options);
}

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
