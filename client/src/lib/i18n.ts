
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
      socialPreviews: 'Social Media Previews',
      pleaseEnterUrl: 'Please enter a URL',
      pleaseEnterValidDomain: 'Please enter a valid domain',
      pleaseEnterValidUrl: 'Please enter a valid URL'
    }
  },
  tr: {
    translation: {
      analyze: 'Analiz Et',
      enterUrl: 'Web sitesi URL\'sini girin (örn: ornek.com)',
      overallScore: 'Genel Puan',
      seoHealth: 'SEO Sağlığı',
      bestPractices: 'En İyi Uygulamalar',
      recommendations: 'Öneriler',
      errors: 'Hatalar',
      warnings: 'Uyarılar',
      info: 'Bilgi',
      googlePreview: 'Google Önizleme',
      socialPreviews: 'Sosyal Medya Önizlemeleri',
      pleaseEnterUrl: 'Lütfen bir URL girin',
      pleaseEnterValidDomain: 'Lütfen geçerli bir alan adı girin',
      pleaseEnterValidUrl: 'Lütfen geçerli bir URL girin'
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'tr', // Changed default language to Turkish
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
