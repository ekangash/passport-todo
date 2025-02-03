/** 1 Node - Modules, Components, Hooks, Icons */
import { makeObservable, action, observable } from "mobx";
import Cookies from "universal-cookie";

/** 2 App - Components, Hooks */
import { PASSPORT_STATUS } from "@/types/passport.d";

/** 3 Entities, Stores, Packages, Enums ... */
import { obj } from "data-support";
import { nanoid } from "nanoid";
import { decrypt, encrypt } from "@/packages/crypt/index";

type AccessToken = string;

interface Profile {
  fullname: string;
  email: string;
  password: string;
  accessToken: AccessToken;
}

type SessionProfile = Omit<Profile, "password">;

/**
 * @type Passport
 */
export class Passport {
  /**
   * @property {PASSPORT_STATUS} status Статус.
   */
  status: PASSPORT_STATUS = PASSPORT_STATUS.LOADING;

  /**
   * @property {object|null} session Профиль сименса авторизации.
   */
  session: SessionProfile | null = null;

  /**
   * @return {void}
   */
  constructor() {
    makeObservable(this, {
      session: observable,
      status: observable,
      setStatus: action.bound,
      setSession: action.bound,
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
    return this.status === PASSPORT_STATUS.AUTHENTICATED && obj.contains(this.session);
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
      const sessionProfileFromCookie: string = await new Promise(resolve => {
        setTimeout(() => resolve(new Cookies(null, { path: "/" }).get("session") || ""), 2000);
      });

      if (!sessionProfileFromCookie) {
        this.setSession(null);
        this.setStatus(PASSPORT_STATUS.UNAUTHENTICATED);

        return;
      }

      const sessionProfile: SessionProfile = await decrypt(sessionProfileFromCookie);
      this.setSession(sessionProfile);
      this.setStatus(PASSPORT_STATUS.AUTHENTICATED);
    } catch (err) {
      this.setSession(null);
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
    const profiles: Profile[] = JSON.parse(localStorage.getItem("profiles") || "[]") as Profile[];
    let accessProfile = null;

    for (let idx = 0; idx < profiles.length; idx++) {
      const profile: Profile = profiles[idx];
      const profileAllowedLogin =
        obj.get(profile, "email") === email && obj.get(profile, "password") === passport;

      if (profileAllowedLogin) {
        accessProfile = { ...profile, accessToken: nanoid(32) };
        profiles[idx] = accessProfile;
      }
    }

    if (accessProfile === null) {
      throw Error("Пользователь не идентифицирован в системе");
    }

    const session: string = await encrypt(
      obj.omit<Omit<Profile, "password">>(accessProfile, ["password"])
    );
    new Cookies(null, { path: "/" }).set("session", session);
    localStorage.setItem("profiles", JSON.stringify(profiles));

    // await axios.create().post("/api/passport/login", { email, passport });
  }

  /**
   * Формирует учетную запись.
   *
   * @return {Promise<void>} Токен авторизации.
   */
  async register(email: string, password: string, fullname: string): Promise<void> {
    const profiles: Profile[] = JSON.parse(localStorage.getItem("profiles") || "[]") as Profile[];
    profiles.push({ email, password, fullname, accessToken: null });
    localStorage.setItem("profiles", JSON.stringify(profiles));

    // await axios.create().post("/api/passport/register", profile);
  }

  /**
   * Закрывает авторизации учетной записи.
   *
   * @return {Promise<this>} Экземпляр текущего объекта.
   */
  async logout(): Promise<any> {
    const profiles: Profile[] = JSON.parse(localStorage.getItem("profiles") || "[]") as Profile[];

    for (let idx = 0; idx < profiles.length; idx++) {
      const profile: Profile = profiles[idx];
      const profileAllowedLogin = obj.get(profile, "email") === obj.get(this.session, "email");

      if (profileAllowedLogin) {
        profile.accessToken = null;
        profiles[idx] = profile;
      }
    }

    localStorage.setItem("profiles", JSON.stringify(profiles));
    this.setSession(null);
    this.setStatus(PASSPORT_STATUS.UNAUTHENTICATED);
    new Cookies(null, { path: "/" }).remove("session");

    // await axios.create(this.accessToken).post(`/api/passport/logout`);
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
   * @param {SessionProfile} session Значение сессии профиля.
   *
   * @return {void}
   */
  setSession(session: SessionProfile | null): void {
    this.session = session;
  }
}

export const PassportStore: Passport = new Passport();
