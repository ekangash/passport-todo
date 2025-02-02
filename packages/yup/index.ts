/** 1 Node - Modules, Components, Hooks, Icons */
import * as npmYup from "yup";

/** 2 App - Components, Hooks */
/** 3 Entities, Stores, Packages, Enums ... */
import { str } from "data-support";

/**
 * Максимальное значение integer в postgres
 *
 * @type {number}
 */
const MAX_NUMBER_SQL_LIMIT: number = 2147483647;

/**
 * Минимальное значение integer в postgres
 *
 * @type {number}
 */
const MIN_NUMBER_SQL_LIMIT: number = -2147483648;

/**
 * Трансформирует схему для обработки пустой строки
 *
 * @param {any} value Преобразованное значение
 * @param {any} originalValue Значение, введенное в поле
 *
 * @return {string} Непустая строка или null, если в поле ничего не введено
 */
function transformSchemaToAllowEmptyString(value, originalValue) {
  if (this.isType(value)) {
    return value;
  }

  if (str.empty(originalValue.trim())) {
    return "";
  }

  return originalValue;
}

/**
 * Функция валидации числовых данных с возможностью передачи пустой строки
 *
 * @return {npmYup.NumberSchema<number | undefined, object>} Схема валидации чисел
 */
const YupCustomNumberSchema = function (): npmYup.NumberSchema {
  return new npmYup.NumberSchema<number | undefined, object>()
    .transform(transformSchemaToAllowEmptyString)
    .max(MAX_NUMBER_SQL_LIMIT)
    .min(MIN_NUMBER_SQL_LIMIT);
  // .nullable(undefined);
};

/**
 * Функция валидации поля даты с возможностью передачи пустой строки
 *
 * @return {npmYup.DateSchema<Date | undefined, object>} Схема валидации даты
 */
const YupCustomDateSchema = function (): npmYup.DateSchema {
  return new npmYup.DateSchema<Date | undefined, object>().transform(
    transformSchemaToAllowEmptyString
  );
  // .nullable(undefined);
};

/**
 * Кастомный объект yup
 *
 * @type {object}
 */
export const yup = {
  ...npmYup,
  number: YupCustomNumberSchema,
  date: YupCustomDateSchema,
};
