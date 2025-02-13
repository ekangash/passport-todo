/** 1 Node - Modules, Components, Hooks, Icons */
import { makeObservable, action, observable } from "mobx";
import Cookies from "universal-cookie";
import { obj } from "data-support";

/** 2 App - Components, Hooks */
import { PASSPORT_STATUS } from "@/types/passport.d";

/** 3 Entities, Stores, Packages, Enums ... */
import { axios } from "@/packages/axios";

interface Profile {
  fullname: string;
  email: string;
  password: string;
}

// type AccessToken = string;
// type Session = {
//   accessToken: AccessToken;
// }

/**
 * @type Passport
 */
export class Passport {
  /**
   * @property {PASSPORT_STATUS} status Статус.
   */
  status: PASSPORT_STATUS = PASSPORT_STATUS.LOADING;

  /**
   * @property {Profile|null} profile Профиль сименса авторизации.
   */
  profile: Profile | null = null;

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
      // const sessionFromCookie: string = new Cookies(null, { path: "/" }).get("session") || "";
      const accessToken: string = new Cookies(null, { path: "/" }).get("accessToken") || "";

      if (!accessToken) {
        this.setProfile(null);
        this.setStatus(PASSPORT_STATUS.UNAUTHENTICATED);

        return;
      }

      // const session: Session = await decrypt(sessionFromCookie);
      const profile = await axios
        .create(accessToken)
        .get("/api/profile")
        .then(({ data }) => data);

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
    const response = await axios
      .create()
      .post("/api/auth/login", { email, password })
      .then(({ data }) => data);

    // const session: string = await encrypt({ accessToken: response.token });
    // new Cookies(null, { path: "/", secure: true }).set("session", session);
    new Cookies(null, { path: "/" }).set("accessToken", response.token);

    const profile = await axios
      .create(response.token)
      .get("/api/profile")
      .then(({ data }) => data);

    this.setProfile(profile);
    this.setStatus(PASSPORT_STATUS.AUTHENTICATED);
  }

  /**
   * Формирует учетную запись.
   *
   * @return {Promise<void>} Токен авторизации.
   */
  async register(email: string, password: string, fullname: string): Promise<void> {
    const response = await axios
      .create()
      .post("/api/auth/register", { email, password, fullname })
      .then(({ data }) => data);

    try {
      // const session: string = await encrypt({ accessToken: response.token });
      // new Cookies(null, { path: "/", secure: true }).set("session", session);
      new Cookies(null, { path: "/" }).set("accessToken", response.token);

      const profile = await axios
        .create(response.token)
        .get("/api/profile")
        .then(({ data }) => data);

      this.setProfile(profile);
      this.setStatus(PASSPORT_STATUS.AUTHENTICATED);
    } catch (err) {
      this.setProfile(null);
      this.setStatus(PASSPORT_STATUS.UNAUTHENTICATED);
    }
  }

  /**
   * Закрывает авторизации учетной записи.
   *
   * @return {Promise<this>} Экземпляр текущего объекта.
   */
  async logout(): Promise<any> {
    this.setProfile(null);
    this.setStatus(PASSPORT_STATUS.UNAUTHENTICATED);
    new Cookies(null, { path: "/" }).remove("accessToken");
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
