export default function phoneMask(value: string): string {
  if (!value) return '';

  // Убираем все нецифровые символы
  const digits = value.replace(/\D/g, '');

  // Ограничиваем до 11 цифр (для +7)
  if (digits.length > 11) return phoneMask(digits.slice(0, 11));

  let formatted = '+7 ';

  if (digits.length > 1) {
    formatted += '(' + digits.slice(1, 4);
    if (digits.length >= 4) {
      formatted += ') ' + digits.slice(4, 7);
      if (digits.length >= 7) {
        formatted += '-' + digits.slice(7, 9);
        if (digits.length >= 9) {
          formatted += '-' + digits.slice(9, 11);
        }
      }
    }
  }

  return formatted;
}