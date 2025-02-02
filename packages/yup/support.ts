/** 1 Node - Modules, Components, Hooks, Icons */
/** 2 App - Components, Hooks */
/** 3 Entities, Stores, Packages, Enums ... */
import { arr, obj } from "data-support";
import { ObjectSchema, SchemaDescription } from "yup";

/**
 * Класс для работы со схемой валидации сущности
 *
 * @class AppEntityWithSchema
 */
export const yupSupport = {
  /**
   * Задает метки из сущности для всех полей схемы валидации
   *
   * @param {string[]} attributeNames Схема валидации
   * @param {object} labels Схема валидации
   * @param {object} schema Схема валидации
   *
   * @return {void}
   */
  prepareSchemaWithLabels<R = ObjectSchema<any>>(
    attributeNames: string[],
    labels: object,
    schema: { fields: object }
  ): R {
    for (const attributeName of attributeNames) {
      if (obj.isset(schema.fields, attributeName)) {
        schema["fields"][attributeName]["spec"]["label"] = obj.get<string>(
          labels,
          attributeName,
          ""
        );
      }
    }

    return schema as R;
  },

  /**
   * Проверяет, является ли поле обязательным
   *
   * @param {string} fieldName Наименование поля
   * @param schema
   *
   * @return {boolean} Является ли поле обязательным
   */
  attributeIsRequired(fieldName: string, schema: ObjectSchema<any>): boolean {
    const schemaDescription = schema.describe();
    const fieldRules: SchemaDescription = schemaDescription.fields[fieldName] as SchemaDescription;

    if (obj.isset(fieldRules, "tests") && arr.contains(fieldRules.tests)) {
      return fieldRules.tests.findIndex(({ name }) => name === "required") >= 0;
    } else if (fieldRules?.type === "boolean") {
      return obj.isset(fieldRules, "oneOf") && fieldRules?.oneOf[0] === true;
    }

    return false;
  },
};
