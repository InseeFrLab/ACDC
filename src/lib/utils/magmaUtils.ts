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
): Record<'fr-FR' | 'en-IE' | string, string> {
  const transformed: Record<'fr-FR' | 'en-IE' | string, string> = {} as Record<
    'fr-FR' | 'en-IE' | string,
    string
  >;
  labels.forEach((label) => {
    const languageCode = getLanguageCode(label.langue);
    transformed[languageCode] = label.contenu;
  });
  console.log('Transformed intl fields: ', transformed);
  return transformed;
}
