import { Jwt } from "./token";

export const BASE_URL = "http://localhost:8080/api/v1/";
// export const BASE_URL = "https://api.dontbelate.jinyshin.com/api/v1/";

export class HttpException extends Error {
  readonly code: number;
  readonly text: string;

  constructor(statusCode: number, statusText: string, message?: string) {
    if (typeof message === 'undefined') {
      super(`${statusCode} ${statusText}`);
    } else {
      super(`${statusCode} ${statusText}: ${message}`);
    }

    this.code = statusCode;
    this.text = statusText;

  }
}

export class BadRequestException extends HttpException {
  constructor(message?: string) {
    super(400, "Bad Request", message);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message?: string) {
    super(401, "Unauthorized", message);
  }
}

export class ForbiddenException extends HttpException {
  constructor(message?: string) {
    super(403, "Forbidden", message);
  }
}

export class NotFoundException extends HttpException {
  constructor(message?: string) {
    super(404, "Not Found", message);
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(message?: string) {
    super(500, "Internal Server Error", message);
  }
}

export class ApiBuilder {
  private url?: URL;
  private method?: "GET" | "POST" | "PUT" | "DELETE";
  private headers: [string, string][] = [];
  private withAuth = false;

  setUrl(endpoint: string, baseUrl: string): ApiBuilder {
    this.url = new URL(endpoint, baseUrl);
    return this;
  }

  setMethod(method: "GET" | "POST" | "PUT" | "DELETE"): ApiBuilder {
    this.method = method;
    return this;
  }

  setHeader(key: string, value: string): ApiBuilder {
    this.headers.push([key, value]);
    return this;
  }

  setAuth(): ApiBuilder {
    this.withAuth = true;
    return this;
  }

  commit<T, U>(): (data: T) => Promise<U> {
    let { url, method, headers, withAuth } = this;

    return ApiBuilder.inner<T, U>(url!, method!, headers, withAuth);
  }

  commitWithParams<T, U, V extends Record<string, number | string>>(): (data: T, param: V) => Promise<U> {
    let { url, method, headers, withAuth } = this;

    return ApiBuilder.inner<T, U, V>(url!, method!, headers, withAuth);
  }
  private static getContentType(headers: [string, string][]) {
    let typ: "json" | "multipart" | "plain" | "urlencode" | undefined;

    typ = undefined;
    for (let [k, v] of headers) {
      if (k === "Content-Type") {
        if (v === "application/json") {
          typ = "json";
        } else if (v === "multipart/form-data") {
          typ = "multipart";
        } else if (v === "application/x-www-form-urlencoded") {
          typ = "urlencode";
        } else {
          typ = "plain";
        }
      }
    }

    return typ;
  }

  private static getResponseContentType(res: Response): "json" | "unknown" {
    let typ: "json" | "unknown";
    res.headers.forEach((v, k) => {
      console.log(v, k);
    })

    typ = "unknown";
    res.headers.forEach((v, k) => {
      if (k.toLowerCase() === "content-type") {
        if (v.includes("application/json")) {
          typ = "json";
        }
      }
    });

    return typ;
  }

  private static inner<T, U, V extends undefined | Record<string, number | string> = undefined>(
    url: URL,
    method: "GET" | "POST" | "PUT" | "DELETE",
    headers: [string, string][] = [],
    withAuth: boolean
  ): (data: T, param?: V) => Promise<U> {
    return async (data, param) => {
      if (typeof param !== "undefined") {
        url = new URL(url!);
        let { pathname } = url;

        for (let k in param) {
          pathname = pathname.replace(`:${k}`, param[k].toString());
        }

        url.pathname = pathname;
      }

      let body;
      let ctype = ApiBuilder.getContentType(headers);
      switch (ctype) {
        case "json":
          body = JSON.stringify(data);
          break;

        case 'multipart':
          body = new FormData();
          for (let k in data) {
            body.append(k, data[k] as string);
          }
          break;

        case "plain":
          body = data!.toString();
          break;

        case "urlencode":
          body = new URLSearchParams();
          for (let k in data) {
            body.append(k, data[k]!.toString());
          }
          break;

        default:
          body = undefined;
          break;
      }

      if (withAuth) {
        let token = Jwt.fromLocalStorage();
        headers.push(["Authorization", token?.toBearerString() ?? ""]);
      }

      let res = await fetch(url!, { method, headers, body })
        .then((res) => {
          if (res.ok) {
            return res;
          } else {
            switch(res.status) {
              case 400:
                throw new BadRequestException();
              case 401:
                throw new UnauthorizedException();
              case 403:
                throw new ForbiddenException();
              case 404:
                throw new NotFoundException();
              case 500:
                throw new InternalServerErrorException();
              default:
                throw new HttpException(res.status, res.statusText);
            }
          }
        });

      let rctype = ApiBuilder.getResponseContentType(res);
      switch (rctype) {
        case "json":
          return await res.json();
        case "unknown":
          return await res.text();
      }
    };
  }
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

class ApiBuilder2 {
  url: URL;
  method: HttpMethod = "GET";
  headers: [string, string][] = [];

  constructor(endpoint: string, baseUrl: string | URL) {
    this.url = new URL(endpoint, baseUrl);
  }

  usePathParams<T>(): ApiBuilder2 {
    return this;
  }
}
