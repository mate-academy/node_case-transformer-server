/* eslint-disable no-console */
const { convertToCase } = require('./convertToCase/convertToCase');

const MY_TEXT = 'user_profile_data';
const TARGET_CASE = 'CAMEL';

console.log('=== Тестування логіки ===\n');

try {
  console.log(`Початковий текст: "${MY_TEXT}"`);
  console.log(`Вибраний регістр: ${TARGET_CASE}`);
  console.log('-'.repeat(30));

  const result = convertToCase(MY_TEXT, TARGET_CASE);

  console.log('✅ ОПЕРАЦІЯ УСПІШНА!');
  console.log(`Вибраний початковий регістр: ${result.originalCase}`);
  console.log(`Результат трансформації: "${result.convertedText}"`);
} catch (error) {
  console.error('❌ Помилка трансформації:', error.message);
}
