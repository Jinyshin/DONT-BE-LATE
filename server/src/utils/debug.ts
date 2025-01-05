import process from "node:process";

export function isDev() {
    return process.env.NODE_ENV == "dev";
}

export function isProd() {
    return process.env.NODE_ENV == "prod";
}

export function debugPrint(obj1, ...objN) {
    if (isDev()) {
        console.debug("debug >", obj1, ...objN);
    }
}