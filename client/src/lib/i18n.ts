
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      analyze: 'Analyze',
      analyzing: 'Analyzing...',
      analyzeTags: 'Analyze Tags',
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
  tr: {
    translation: {
      analyze: 'Analiz Et',
      analyzing: 'Analiz Ediliyor...',
      analyzeTags: 'Etiketleri Analiz Et',
      enterUrl: 'Web sitesi URL\'sini girin (örn: example.com)',
      overallScore: 'Genel Puan',
      seoHealth: 'SEO Sağlığı',
      bestPractices: 'En İyi Uygulamalar',
      recommendations: 'Öneriler',
      errors: 'Hatalar',
      warnings: 'Uyarılar',
      info: 'Bilgi',
      googlePreview: 'Google Önizleme',
      socialPreviews: 'Sosyal Medya Önizlemeleri'
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'tr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
