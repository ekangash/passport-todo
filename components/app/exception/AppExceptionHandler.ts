/** 1 Node - Modules, Components, Hooks, Icons */
import { AxiosError } from "axios";
import { toast } from "sonner";

/** 2 App - Components, Hooks */
/** 3 Entities, Stores, Packages, Enums ... */
import { inst } from "data-support";
import { REQUEST_STATUSES } from "@/enums/request/statuses";
import { REQUEST_MESSAGES } from "@/enums/request/messages";

/**
 * Вспомогательные методы для обработки ошибок
 */
export class AppExceptionHandler {
  /**
   * Событие обработки статуса: 400
   *
   * @param {object} exception Экземпляр исключения.
   *
   * @return {any} Результат обработки.
   */
  onBadRequest = exception => {
    toast.error(REQUEST_MESSAGES.BAD_REQUEST);

    return null;
  };

  /**
   * Событие обработки статуса: 401
   *
   * @param {object} exception Экземпляр исключения.
   *
   * @return {any} Результат обработки.
   */
  onUnauthorized = exception => {
    toast.error(exception?.response?.data?.message || REQUEST_MESSAGES.UNAUTHORIZED);

    return null;
  };

  /**
   * Событие обработки статуса: 403
   *
   * @param {object} exception Экземпляр исключения.
   *
   * @return {any} Результат обработки.
   */
  onForbidden = exception => {
    toast.error(exception?.response?.data?.message || REQUEST_MESSAGES.FORBIDDEN);

    return null;
  };

  /**
   * Событие обработки статуса: 404
   *
   * @param {object} exception Экземпляр исключения.
   *
   * @return {any} Результат обработки.
   */
  onNotFound = exception => {
    toast.error(REQUEST_MESSAGES.NOT_FOUND);

    return null;
  };

  /**
   * Событие обработки статуса: 418
   *
   * @param {object} exception Экземпляр исключения.
   *
   * @return {any} Результат обработки.
   */
  onIAmTeapot = exception => {
    toast.error(exception?.response?.data?.message || REQUEST_MESSAGES.I_AM_TEAPOT);

    return null;
  };

  /**
   * Событие обработки статуса: 422
   *
   * @param {object} exception Экземпляр исключения.
   *
   * @return {any} Результат обработки.
   */
  onUnprocessableEntity = exception => {
    toast.error(REQUEST_MESSAGES.UNPROCESSABLE_ENTITY);

    return null;
  };

  /**
   * Событие обработки статуса: 429
   *
   * @param {object} exception Экземпляр исключения.
   *
   * @return {any} Результат обработки.
   */
  onTooManyRequests = exception => {
    toast.error(REQUEST_MESSAGES.TOO_MANY_REQUESTS);

    return null;
  };

  /**
   * Событие обработки статуса: 500
   *
   * @param {object} exception Экземпляр исключения.
   *
   * @return {any} Результат обработки.
   */
  onInternalServer = exception => {
    toast.error(REQUEST_MESSAGES.INTERNAL_SERVER);

    return null;
  };

  /**
   * Событие исключения.
   *
   * @param {object} exception Экземпляр исключения.
   *
   * @return {any} Результат обработки.
   */
  onError = exception => {
    toast.error(exception.message);

    return null;
  };

  /**
   * Конструктор класса.
   *
   * @param {object} eventFns Функции события
   *
   * @return {this} Экземпляр текущего объекта.
   */
  fillEvents(eventFns: object = {}): this {
    for (const [eventName, eventFn] of Object.entries(eventFns)) {
      if (inst.isset(this, eventName)) {
        this[eventName] = eventFn;
      }
    }

    return this;
  }

  /**
   * Реализует централизованный вывод ошибок в консоль
   *
   * @param {object} exception Экземпляр исключения.
   *
   * @return {any} Результат обработки.
   */
  handle(exception): any {
    if (inst.get(exception, "isAxiosError", false) && exception instanceof AxiosError) {
      return this.handleAxiosException(exception);
    } else {
      return this.onError(exception);
    }
  }

  /**
   * Обрабатывает исключение Axios.
   *
   * @param {AxiosError} exception Экземпляр исключения.
   *
   * @return {any} Результат обработки.
   */
  handleAxiosException(exception: AxiosError): any {
    const responseStatus: number = exception?.response?.status || 0;

    if (responseStatus === REQUEST_STATUSES.BAD_REQUEST) {
      return this.onBadRequest(exception);
    } else if (responseStatus === REQUEST_STATUSES.UNAUTHORIZED) {
      return this.onUnauthorized(exception);
    } else if (responseStatus === REQUEST_STATUSES.FORBIDDEN) {
      return this.onForbidden(exception);
    } else if (responseStatus === REQUEST_STATUSES.NOT_FOUND) {
      return this.onNotFound(exception);
    } else if (responseStatus === REQUEST_STATUSES.I_AM_TEAPOT) {
      return this.onIAmTeapot(exception);
    } else if (responseStatus === REQUEST_STATUSES.UNPROCESSABLE_ENTITY) {
      return this.onUnprocessableEntity(exception);
    } else if (responseStatus === REQUEST_STATUSES.TOO_MANY_REQUESTS) {
      return this.onTooManyRequests(exception);
    } else if (responseStatus === REQUEST_STATUSES.INTERNAL_SERVER) {
      return this.onInternalServer(exception);
    }

    console.error("Unresolved axios error status", responseStatus, exception);
  }
}
