/** 1 Node - Modules, Components, Hooks, Icons */
import { makeObservable, action, observable } from "mobx";
import { axios } from "@/packages/axios";

/** 2 App - Components, Hooks */
import { PASSPORT_STATUS } from "@/types/passport.d";

/** 3 Entities, Stores, Packages, Enums ... */
import { str } from "data-support";

/**
 * @type Passport
 */
export class Passport {
  /**
   * @property {PASSPORT_STATUS} status Статус.
   */
  status: PASSPORT_STATUS = PASSPORT_STATUS.LOADING;

  /**
   * @property {object|null} profile Профиль сименса авторизации.
   */
  profile: object | null = null;

  /**
   * @property {object|null} accessToken Токен безопасности.
   */
  accessToken: string | null = null;

  /**
   * @return {void}
   */
  constructor() {
    makeObservable(this, {
      profile: observable,
      status: observable,
      accessToken: observable,
      setStatus: action.bound,
      setProfile: action.bound,
      isAuthenticated: observable,
      isLoading: observable,
    });
  }

  /**
   * Проверяет, авторизированна лм учетная запись.
   *
   * @return {boolean}
   */
  isAuthenticated(): boolean {
    return this.status === PASSPORT_STATUS.AUTHENTICATED && str.contains(this.accessToken);
  }

  /**
   * Проверяет, является ли учетная запись админом.
   *
   * @return {boolean}
   */
  isLoading(): boolean {
    return this.status !== PASSPORT_STATUS.LOADING;
  }

  /**
   *
   * @return {Promise<void>}
   */
  async initSession(): Promise<object> {
    this.setStatus(PASSPORT_STATUS.LOADING);

    try {
      const session = await axios
        .create(this.accessToken)
        .get("/api/passport/profile")
        .then(({ data }) => data);
      // const session = await new Promise((resolve, reject) => {
      //     // setTimeout(() => resolve({ accessToken: 'wadwdjahawhdhawd', profile: { name: 'Jon', email: 'jon@exemple.ru' } }), 2000);
      //     setTimeout(() => resolve(null), 2000);
      // })

      this.setProfile(session);
      this.setStatus(PASSPORT_STATUS.AUTHENTICATED);

      return session;
    } catch (err) {
      this.setProfile(null);
      this.setStatus(PASSPORT_STATUS.UNAUTHENTICATED);

      throw err;
    }
  }

  /**
   * Авторизация учетной записи.
   *
   * @return {Promise<void>} Токен авторизации.
   */
  async login(email: string, passport: string): Promise<void> {
    await axios.create().post("/api/passport/login", { email, passport });
  }

  /**
   * Формирует учетную запись.
   *
   * @return {Promise<void>} Токен авторизации.
   */
  async register(email: string, passport: string): Promise<void> {
    await axios.create().post("/api/passport/register", { email, passport });
  }

  /**
   * Закрывает авторизации учетной записи.
   *
   * @return {Promise<this>} Экземпляр текущего объекта.
   */
  async logout(): Promise<any> {
    await axios.create(this.accessToken).post(`/api/passport/logout`);
  }

  /**
   * Устанавливает значение статуса.
   *
   * @param status Значение статуса.
   *
   * @return {void}
   */
  setStatus(status: PASSPORT_STATUS): void {
    this.status = status;
  }

  /**
   * Устанавливает состояние сессии.
   *
   * @param {object} profile Значение сессии профиля.
   *
   * @return {void}
   */
  setProfile(profile: object): void {
    this.profile = profile;
  }
}

export const PassportStore: Passport = new Passport();
