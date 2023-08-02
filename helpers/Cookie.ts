type Options = {
    maxAge?: number;
    expires?: number | string | Date;
    path?: string;
    domain?: string;
    secure?: boolean;
    samesite?: string;
};

class Cookie {
  maxAge: number;
  expires: number | string | Date;
  path: string;
  domain: string;
  secure: boolean;
  samesite: string;

  constructor({
    maxAge, expires, path, domain, secure, samesite
  } : Options = {}) {
    this.maxAge = maxAge;
    this.expires = expires;
    this.path = path;
    this.domain = domain;
    this.secure = secure;
    this.samesite = samesite;

    this.set = this.set.bind(this)
    this.get = this.get.bind(this)
  }

  set(name: string, value: string, {
    maxAge = this.maxAge, expires = this.expires, path = this.path, domain = this.domain, secure = this.secure, samesite = this.samesite
  }: Options = {}): void {
    let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    if (path) {
      cookie += `;path=${path}`;
    }
    if (domain) {
      cookie += `;domain=${domain}`;
    }
    if (maxAge || maxAge === 0) {
      cookie += `;max-age=${maxAge}`;
    }
    if (expires) {
      if (expires.constructor === Number) {
        expires = new Date(expires);
      }
      cookie += `;expires=${expires instanceof Date ? expires.toUTCString() : expires}`;
    }
    if (secure) {
      cookie += ';secure';
    }
    if (samesite) {
      cookie += `;samesite=${samesite}`;
    }
    document.cookie = cookie;
  }

  get(name: string): string | null {
    const result = document?.cookie.match(new RegExp(`(?:^\\s*|;\\s*)${
      encodeURIComponent(name).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*=\\s*([^;]*)`));
    return result ? decodeURIComponent(result[1]) : null;
  }

  parseCookies(cookies: string): Record<string, string> {
    const list = {};
    if (!cookies) return list;

    cookies.split(';').forEach((cookie) => {
      const [name, ...rest] = cookie.split('=');
      const trimmedName = name?.trim();
      if (!trimmedName) return;
      const value = rest.join('=').trim();
      if (!value) return;
      list[trimmedName] = decodeURIComponent(value);
    });

    return list;
  }

  remove(name: string, opts: Options = {}): void {
    opts.maxAge = -1;
    this.set(name, '', opts);
  }
}

const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toUTCString(); // Однодневные куки
const cookie = new Cookie({ expires, path: '/' });
export { Cookie, cookie };
