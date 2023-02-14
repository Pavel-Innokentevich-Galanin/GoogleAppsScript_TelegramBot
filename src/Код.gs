// Эта функция-кастыль, чтобы работала кнопка "Выполнить"
// Функция main вызовется и без функции myFunction
function myFunction() {

}

var envJson = HtmlService.createHtmlOutputFromFile("env.html").getContent();
const env = JSON.parse(envJson);

function main() {
  console.log("Это данные env взятые из файла env.html (аналог файла .env, env.js):");
  console.log(env);

  const token = env.token;
  const chat_id = env.authorId;
  const text = `Эй ты. (${new Date()})`;
  sendMessage(token, chat_id, text);
}
main()

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

function sendMessage(token, chat_id, text) {
  // Создаю объект с данными в URL
  const data = {
    chat_id,
    text,
  };

  // Разбиваю объект на парметры в URL (?ключ1=значение1&ключ2=значение2&ключ3=значение3)
  const query = createQuery(data); // Мой аналог new URLSearchParams(data);

  // Создаю URL из токена и параметров
  const url = `https://api.telegram.org/bot${token}/sendMessage${query}`;

  console.log('Отправлено сообщение методом POST соедующим URL\'ом')
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
