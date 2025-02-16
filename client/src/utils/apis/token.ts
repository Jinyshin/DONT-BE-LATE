import { debugPrint } from "../debug";

export class Jwt {
  private static readonly LS_KEY = "accessToken";

  constructor(
    readonly hdr: { alg: "HS256", typ: "JWT" },
    readonly pl: { id: number, email: string, nickname: string, profile_url: string },
    readonly sig: string,
  ) {}

  toString(): string {
    const hdr = btoa(JSON.stringify(this.hdr));
    const pl = btoa(JSON.stringify(this.pl));
    const sig = this.sig;

    return `${hdr}.${pl}.${sig}`;
  }

  toBearerString(): string {
    return `Bearer ${this.toString()}`;
  }

  storeToLocalStorage() {
    localStorage.setItem(Jwt.LS_KEY, this.toString());
  }

  static fromString(s: string): Jwt | null {
    try {
      const [hdr, pl, sig] = s.split(".");
      return new Jwt(JSON.parse(atob(hdr)), JSON.parse(atob(pl)), sig);
    } catch(e) {
      debugPrint(e, s);
      return null;
    }
  }

  static fromLocalStorage(): Jwt | null {
    const token = localStorage.getItem(Jwt.LS_KEY);
    if (token === null) {
      debugPrint("cannot find token at local storage");
      return null;
    }

    return Jwt.fromString(token);
  }
}
