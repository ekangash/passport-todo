/** 1 Node - Modules, Components, Hooks, Icons */
import { makeObservable, action, observable } from "mobx";
import Cookies from "universal-cookie";
import { obj, str } from "data-support";

/** 2 App - Components, Hooks */
import { PASSPORT_STATUS } from "@/types/passport.d";

/** 3 Entities, Stores, Packages, Enums ... */
import { nanoid } from "nanoid";
import { decrypt, encrypt } from "@/packages/crypt/index";
import {axios} from "@/packages/axios";

type AccessToken = string;

interface Profile {
  fullname: string;
  email: string;
  password: string;
}

type Session = {
  accessToken: AccessToken;
};

/**
 * @type Passport
 */
export class Passport {
  /**
   * @property {PASSPORT_STATUS} status Статус.
   */
  status: PASSPORT_STATUS = PASSPORT_STATUS.LOADING;

  /**
   * @property {Session|null} accessToken Профиль сименса авторизации.
   */
  profile: Profile|null = null

  /**
   * @return {void}
   */
  constructor() {
    makeObservable(this, {
      profile: observable,
      status: observable,
      setStatus: action.bound,
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
    return this.status === PASSPORT_STATUS.AUTHENTICATED && obj.contains(this.profile);
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
  async initSession(): Promise<void> {
    this.setStatus(PASSPORT_STATUS.LOADING);

    try {
      const sessionFromCookie: string = new Cookies(null, { path: "/" }).get("session") || "";

      if (!sessionFromCookie) {
        this.setProfile(null);
        this.setStatus(PASSPORT_STATUS.UNAUTHENTICATED);

        return;
      }

      const session: Session = await decrypt(sessionFromCookie);
      const profile = await axios.create(obj.get(session, 'accessToken', '')).get("/api/profile").then(({ data }) => data);

      this.setProfile(profile);
      this.setStatus(PASSPORT_STATUS.AUTHENTICATED);
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
  async login(email: string, password: string): Promise<void> {
    try {
      const response = await axios.create().post("/api/auth/login", { email, password }).then(({ data }) => data);

      const session: string = await encrypt({ accessToken: response.token });
      new Cookies(null, { path: "/", secure: true }).set("session", session);

    } catch (err) {
      this.setProfile(null);
      this.setStatus(PASSPORT_STATUS.UNAUTHENTICATED);
    }
  }

  /**
   * Формирует учетную запись.
   *
   * @return {Promise<void>} Токен авторизации.
   */
  async register(email: string, password: string, fullname: string): Promise<void> {
    const response = await axios.create().post("/api/auth/register", { email, password, fullname }).then(({ data }) => data);

    const session: string = await encrypt({ accessToken: response.token });
    new Cookies(null, { path: "/", secure: true }).set("session", session);
  }

  /**
   * Закрывает авторизации учетной записи.
   *
   * @return {Promise<this>} Экземпляр текущего объекта.
   */
  async logout(): Promise<any> {
    this.setProfile(null);
    this.setStatus(PASSPORT_STATUS.UNAUTHENTICATED);
    new Cookies(null, { path: "/" }).remove("session");
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
   * @param {Profile} profile Значение сессии профиля.
   *
   * @return {void}
   */
  setProfile(profile: Profile): void {
    this.profile = profile;
  }
}

export const PassportStore: Passport = new Passport();
