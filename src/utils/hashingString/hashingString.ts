import { sha256 } from "js-sha256";

export const hashingString = (string: string) => sha256(string);
