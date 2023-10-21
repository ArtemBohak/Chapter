import { cyrillicPattern } from "../regex/cyrillicPattern";

export default (value: string): boolean => cyrillicPattern.test(value);
