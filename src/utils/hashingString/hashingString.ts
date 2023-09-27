import { sha256 } from "js-sha256";

const hashingString = (string: string) => sha256(string);

export default hashingString;
