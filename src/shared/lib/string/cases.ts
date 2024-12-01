/**
 * 문자열을 camelCase로 변환
 * example: "hello-world" -> "helloWorld"
 */
export function camelCase(str: string): string {
  str = str.trim();

  if (!/[-_\s]/.test(str)) {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }

  return str
    .toLowerCase()
    .replace(/^[-_\s]+/, '')
    .replace(/[-_\s]+(.)?/g, (match, character) => (character ? character.toUpperCase() : ''));
}

/**
 * 문자열을 UPPER_CASE로 변환
 * example: "hello-world" -> "HELLO_WORLD"
 */
export function upperCase(str: string): string {
  return str
    .trim()
    .replace(/([A-Z0-9])/g, '_$1')
    .replace(/-/g, '_')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_/, '')
    .replace(/_$/, '')
    .toUpperCase();
}
