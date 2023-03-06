import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import XHR from 'i18next-http-backend';

i18n
  .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    fallbackLng: {
      'en-IE': ['en-IE'],
      'en-US': ['en-IE'],
      'en-GB': ['en-IE'],
      'fr-FR': ['fr-FR'],
      fr: ['fr-FR'],
      en: ['en-IE'],
      default: ['fr-FR'],
    },
    ns: [
      'common',
      'home',
      'header',
      'dataCollectionForm',
      'collectionEvent',
      'dataCollectionDetails',
      'form',
      'userAttributeForm',
    ],

    interpolation: {
      escapeValue: false,
      formatSeparator: ',',
    },

    debug: process.env.NODE_ENV === 'development',
  });

export default i18n;
