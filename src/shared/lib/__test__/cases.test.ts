import { describe, it, expect } from 'vitest';

import { camelCase, upperCase } from '../string';

describe('string cases', () => {
  const testCases = [
    ['hello-world', 'helloWorld'],
    ['hello_world', 'helloWorld'],
    ['HelloWorld', 'helloWorld'],
    ['hello world', 'helloWorld'],

    // 1. 여러 개의 구분자가 연속으로 있는 경우
    ['hello---world', 'helloWorld'],
    ['hello___world', 'helloWorld'],
    ['hello   world', 'helloWorld'],
    ['hello-_-world', 'helloWorld'],

    // 2. 여러 단어가 있는 경우
    ['hello-beautiful-world', 'helloBeautifulWorld'],
    ['hello_beautiful_world', 'helloBeautifulWorld'],

    // 3. 대소문자가 섞여있는 경우
    ['HELLO-WORLD', 'helloWorld'],
    ['Hello-World', 'helloWorld'],
    ['hello-World', 'helloWorld'],

    // 4. 숫자가 포함된 경우
    ['hello-world-123', 'helloWorld123'],
    ['123-hello-world', '123HelloWorld'],

    // 5. 특수한 경우
    ['', ''],
    ['-hello-world', 'helloWorld'],
    ['hello-world-', 'helloWorld'],
    ['hello--world', 'helloWorld'],

    // 6. 한 글자 단어
    ['a-b-c', 'aBC'],
    ['a_b_c', 'aBC'],

    // 7. 공백 관련
    [' hello world ', 'helloWorld'],
    ['hello  world', 'helloWorld']
  ];

  testCases.forEach(([input, expected]) => {
    it(`should convert "${input}" to "${expected}"`, () => {
      const result = camelCase(input);
      try {
        expect(result).toBe(expected);
      } catch (error) {
        console.warn(`Input: ${input}`);
        console.warn(`Result: ${result}`);
        console.warn(`Expected: ${expected}`);
        throw error;
      }
    });
  });

  describe('upperCase', () => {
    const testCases = [
      // 기본 테스트 케이스
      ['hello-world', 'HELLO_WORLD'],
      ['hello_world', 'HELLO_WORLD'],
      ['HelloWorld', 'HELLO_WORLD'],
      ['hello world', 'HELLO_WORLD'],

      // 1. 여러 구분자 연속
      ['hello---world', 'HELLO_WORLD'],
      ['hello___world', 'HELLO_WORLD'],
      ['hello   world', 'HELLO_WORLD'],
      ['hello-_-world', 'HELLO_WORLD']
    ];

    testCases.forEach(([input, expected]) => {
      it(`should convert "${input}" to "${expected}"`, () => {
        expect(upperCase(input)).toBe(expected);
      });
    });
  });
});
