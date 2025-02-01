import process from "node:process";

export function isDev(): boolean {
    return process.env.NODE_ENV === "development";
}

export function isProd(): boolean {
    return process.env.NODE_ENV === "production";
}

export function debugPrint(obj1: any, ...objN: any[]) {
    if (isDev()) {
        console.debug("debug >", obj1, ...objN);
    }
}
