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
  const transformed: LanguageRecord = {} as Record<
    'fr-FR' | 'en-IE' | string,
    string
  >;
  labels.forEach((label) => {
    const languageCode = getLanguageCode(label.langue);
    transformed[languageCode] = label.contenu;
  });
  return transformed;
}
