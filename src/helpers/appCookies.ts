import Cookies, { CookieAttributes } from 'js-cookie'

interface IAppCookies {
  setItem(name: string, value: string, options?: CookieAttributes): void
  getItem(name: string): string | undefined
  getAll(): Record<string, string>
  removeItem(name: string, options?: CookieAttributes): void
}

class AppCookies<StorageType extends Cookies.CookiesStatic>
  implements IAppCookies
{
  private readonly storage: StorageType

  constructor(storage: StorageType) {
    this.storage = storage
  }

  setItem(key: string, value: string, options?: CookieAttributes): void {
    this.storage.set(key, value, options)
  }

  getItem(key: string): string | undefined {
    return this.storage.get(key)
  }

  getAll(): Record<string, string> {
    return this.storage.get()
  }

  removeItem(key: string, options?: CookieAttributes): void {
    this.storage.remove(key, options)
  }
}

const appCookiesStorage = new AppCookies<Cookies.CookiesStatic>(Cookies)

export default appCookiesStorage
