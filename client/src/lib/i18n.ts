
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      analyze: 'Analyze',
      enterUrl: 'Enter website URL (e.g., example.com)',
      overallScore: 'Overall Score',
      seoHealth: 'SEO Health',
      bestPractices: 'Best Practices',
      recommendations: 'Recommendations',
      errors: 'Errors',
      warnings: 'Warnings',
      info: 'Information',
      googlePreview: 'Google Preview',
      socialPreviews: 'Social Media Previews'
    }
  },
  es: {
    translation: {
      analyze: 'Analizar',
      enterUrl: 'Ingrese la URL del sitio web (ej: ejemplo.com)',
      overallScore: 'Puntuación General',
      seoHealth: 'Salud SEO',
      bestPractices: 'Mejores Prácticas',
      recommendations: 'Recomendaciones',
      errors: 'Errores',
      warnings: 'Advertencias',
      info: 'Información',
      googlePreview: 'Vista previa de Google',
      socialPreviews: 'Vistas previas de Redes Sociales'
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
