import LanguageRecord from '../model/languageRecord';

export function getLanguageCode(language: string): string {
  // Map the language to its corresponding code
  switch (language) {
    case 'fr':
      return 'fr-FR';
    case 'en':
      return 'en-IE';
    // Add support for other languages here
    default:
      return language;
  }
}

export function transformLabels(
  labels: Record<'langue' | 'contenu', string>[]
): LanguageRecord {
  const transformed: LanguageRecord = {
    'fr-FR': '',
    'en-IE': '',
  };

  labels.forEach((label) => {
    const languageCode = getLanguageCode(label.langue);
    (transformed as unknown as Record<string, string>)[languageCode] =
      label.contenu;
  });

  return transformed;
}
