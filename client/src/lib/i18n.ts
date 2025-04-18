
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
      getTips: 'Get tips to improve your meta tags and SEO',
      analyzeComplete: 'Analysis Complete',
      analysisSuccess: 'Website analysis completed successfully.',
      
      // Analysis Results
      seoAnalysisResults: 'SEO Analysis Results',
      analyzed: 'Analyzed',
      summary: 'Summary',
      analysis: 'Analysis',
      previews: 'Previews',
      allTags: 'All Tags',
      learn: 'Learn',
      noAnalysisResults: 'No analysis results available',
      overallSeoHealth: 'Overall SEO Health',
      yourWebsiteHas: 'Your website has excellent SEO implementation with minimal issues.',
      criticalIssues: 'Critical Issues',
      improvementAreas: 'Improvement Areas',
      implemented: 'Implemented',
      technicalSeo: 'Technical SEO',
      content: 'Content',
      socialSharing: 'Social Sharing',
      structure: 'Structure',
      good: 'Good',
      needsWork: 'Needs Work',
      critical: 'Critical',
      allEssentialElements: 'All essential elements present',
      includesViewport: 'Includes viewport, charset, language, and robots',
      includesTitle: 'Includes title and meta description',
      includesOpenGraph: 'Includes Open Graph and Twitter Card tags',
      includesCanonical: 'Includes canonical URLs and page structure'
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
      getTips: 'Meta etiketlerinizi ve SEO\'nuzu iyileştirmek için ipuçları alın',
      analyzeComplete: 'Analiz Tamamlandı',
      analysisSuccess: 'Web sitesi analizi başarıyla tamamlandı.',
      
      // Analysis Results
      seoAnalysisResults: 'SEO Analiz Sonuçları',
      analyzed: 'Analiz edilen',
      summary: 'Özet',
      analysis: 'Analiz',
      previews: 'Önizlemeler',
      allTags: 'Tüm Etiketler',
      learn: 'Öğren',
      noAnalysisResults: 'Analiz sonucu mevcut değil',
      overallSeoHealth: 'Genel SEO Sağlığı',
      yourWebsiteHas: 'Web siteniz minimal sorunlarla mükemmel SEO uygulamasına sahip.',
      criticalIssues: 'Kritik Sorunlar',
      improvementAreas: 'İyileştirme Alanları',
      implemented: 'Uygulanmış',
      technicalSeo: 'Teknik SEO',
      content: 'İçerik',
      socialSharing: 'Sosyal Paylaşım',
      structure: 'Yapı',
      good: 'İyi',
      needsWork: 'İyileştirme Gerekli',
      critical: 'Kritik',
      allEssentialElements: 'Tüm gerekli elementler mevcut',
      includesViewport: 'Viewport, charset, dil ve robots içerir',
      includesTitle: 'Başlık ve meta açıklama içerir',
      includesOpenGraph: 'Open Graph ve Twitter Card etiketleri içerir',
      includesCanonical: 'Canonical URL\'ler ve sayfa yapısı içerir',
      
      // BestPractices Component
      seoBestPractices: 'SEO En İyi Uygulamaları',
      implementedCount: 'Uygulanmış',
      industryStandard: 'Optimal SEO performansı için sektör standardı uygulamalar',
      missing: 'Eksik',
      
      // RecommendationsList Component
      issuesRecommendations: 'Sorunlar ve Öneriler',
      fixIssues: 'Web sitenizin SEO performansını iyileştirmek için bu sorunları düzeltin',
      allChecksPassed: 'Tüm Kontroller Geçti',
      noIssuesFound: 'Hiçbir sorun bulunamadı',
      yourWebsiteHasAll: 'Web sitenizde gerekli tüm SEO etiketleri bulunuyor ve en iyi uygulamaları takip ediyor.',
      actionSteps: 'Aksiyon Adımları:',
      prioritizeFix: 'Bu sorunu çözmek için önceliklendirin çünkü SEO\'yu önemli ölçüde etkiler',
      reviewRecommendation: 'Verilen önerileri dikkatlice inceleyin',
      implementChanges: 'Değişiklikleri HTML meta verilerinizde uygulayın',
      rerunAnalysis: 'Düzeltmeyi doğrulamak için analizi tekrar çalıştırın',
      considerAddressing: 'SEO performansını artırmak için bu sorunu ele almayı düşünün',
      followGuidelines: 'Öneri yönergelerini takip edin',
      testChanges: 'Değişikliklerin gereksinimleri karşıladığından emin olmak için test edin',
      reviewSuggestion: 'Potansiyel iyileştirmeler için bu öneriyi gözden geçirin',
      implementIfAligned: 'SEO stratejinizle uyumluysa uygulayın',
      
      // Description Length Issue
      descriptionLength: 'Açıklama uzunluğu ({n} karakter) önerilen sınırları aşıyor',
      keepDescription: 'Optimal görüntüleme için açıklama etiketlerini 120-160 karakter arasında tutun',
      
      // Title Tag
      titleTag: 'Başlık Etiketi',
      viewportMetaTag: 'Viewport Meta Etiketi',
      characterEncoding: 'Karakter Kodlaması',
      canonicalURL: 'Kanonik URL',
      languageAttribute: 'Dil Özniteliği',
      openGraphTags: 'Open Graph Etiketleri',
      twitterCardTags: 'Twitter Kart Etiketleri',
      
      // TagsList Component 
      coreTags: 'Çekirdek Etiketler',
      complete: 'Tam',
      socialMedia: 'Sosyal Medya',
      coreMetaTags: 'Çekirdek Meta Etiketler',
      title: 'Başlık',
      viewport: 'Viewport',
      charset: 'Karakter Seti',
      language: 'Dil',
      warning: 'Uyarı',
      missingTags: 'Eksik Etiketler',
      other: 'Diğer'
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
