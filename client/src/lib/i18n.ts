
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
      pleaseEnterValidUrl: 'Please enter a valid URL',
      websiteUrl: 'Website URL',
      enterWebsiteUrl: 'Enter website URL',
      analyzeTags: 'Analyze Tags',
      clearUrl: 'Clear URL',
      seoTagAnalyzer: 'SEO Tag Analyzer',
      visualizeAnalyze: 'Visualize and analyze your website\'s meta tags',
      reset: 'Reset',
      analyzing: 'Analyzing...',
      analyzingMetaTags: 'Analyzing Meta Tags',
      fetchingParsing: 'Fetching and parsing the HTML from the website. This may take a moment depending on the site\'s size.',
      errorAnalyzing: 'Error Analyzing Website',
      failedToAnalyze: 'Failed to analyze website',
      tryAgain: 'Try Again',
      analyzeYourWebsite: 'Analyze Your Website\'s SEO Tags',
      enterWebsiteAbove: 'Enter a website URL above to check meta tags, generate previews, and get recommendations to improve your SEO and social sharing.',
      searchPreviews: 'Search Previews',
      seeHowSite: 'See how your site appears in Google search results',
      socialMediaCards: 'Social Media Cards',
      previewSocial: 'Preview Facebook, Twitter and LinkedIn appearances',
      seoRecommendations: 'SEO Recommendations',
      getTips: 'Get tips to improve your meta tags and SEO'
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
      pleaseEnterValidUrl: 'Lütfen geçerli bir URL girin',
      websiteUrl: 'Web Sitesi URL',
      enterWebsiteUrl: 'Web sitesi URL\'sini girin',
      analyzeTags: 'Etiketleri Analiz Et',
      clearUrl: 'URL\'yi Temizle',
      seoTagAnalyzer: 'SEO Etiket Analizörü',
      visualizeAnalyze: 'Web sitenizin meta etiketlerini görselleştirin ve analiz edin',
      reset: 'Sıfırla',
      analyzing: 'Analiz ediliyor...',
      analyzingMetaTags: 'Meta Etiketleri Analiz Ediliyor',
      fetchingParsing: 'Web sitesinden HTML alınıyor ve işleniyor. Bu, sitenin boyutuna bağlı olarak biraz zaman alabilir.',
      errorAnalyzing: 'Web Sitesi Analiz Hatası',
      failedToAnalyze: 'Web sitesi analiz edilemedi',
      tryAgain: 'Tekrar Dene',
      analyzeYourWebsite: 'Web Sitenizin SEO Etiketlerini Analiz Edin',
      enterWebsiteAbove: 'SEO ve sosyal paylaşımınızı iyileştirmek için meta etiketlerini kontrol etmek, önizlemeler oluşturmak ve öneriler almak için yukarıya bir web sitesi URL\'si girin.',
      searchPreviews: 'Arama Önizlemeleri',
      seeHowSite: 'Sitenizin Google arama sonuçlarında nasıl göründüğünü görün',
      socialMediaCards: 'Sosyal Medya Kartları',
      previewSocial: 'Facebook, Twitter ve LinkedIn görünümlerini önizleyin',
      seoRecommendations: 'SEO Önerileri',
      getTips: 'Meta etiketlerinizi ve SEO\'nuzu iyileştirmek için ipuçları alın'
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en', // Default language is English
    lng: localStorage.getItem('i18nextLng') || 'en', // Use saved language or default to English
    debug: true,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;
