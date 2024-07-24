import { createHash } from "crypto";


export function sha256(msg: string) {
  return createHash('sha256').update(msg).digest('base64');
}
