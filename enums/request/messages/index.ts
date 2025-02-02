/** 1 Node - Modules, Components, Hooks, Icons */
/** 2 App - Components, Hooks */
/** 3 Entities, Stores, Packages, Enums ... */

/**
 * HTTP константы приложения.
 *
 * @type {object}
 */
export const REQUEST_MESSAGES = {
  BAD_REQUEST: "Некорректно сформированные данные. Попробуйте ещё раз",
  UNAUTHORIZED: "Недостаточно прав для выполнения данного действия",
  FORBIDDEN: "Доступ к ресурсу запрещён",
  NOT_FOUND: "Запрошенный ресурс не найден",
  I_AM_TEAPOT:
    "Неизвестная ошибка сервера. Попробуйте ещё раз или обратитесь к системному администратору",
  UNPROCESSABLE_ENTITY: "Серверная валидация не пройдена",
  TOO_MANY_REQUESTS: "Слишком часто, пожалуйста сделайте паузу и попробуйте снова",
  INTERNAL_SERVER:
    "Ошибка на стороне сервера! Попробуйте ещё раз или обратитесь к системному администратору",
};
