
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Button } from './button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Globe } from 'lucide-react';
import ReactCountryFlag from 'react-country-flag';

export function LanguageSelector() {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'en');

  // Update the language state when it changes
  useEffect(() => {
    const updateLanguage = () => {
      setCurrentLanguage(i18n.language.substring(0, 2));
    };
    
    // Set initial language
    updateLanguage();
    
    // Add event listener
    i18n.on('languageChanged', updateLanguage);
    
    // Clean up
    return () => {
      i18n.off('languageChanged', updateLanguage);
    };
  }, [i18n]);

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    // Explicitly save to localStorage
    localStorage.setItem('i18nextLng', lang);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="flex items-center justify-center p-0 h-9 w-9">
          <Globe className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleLanguageChange('tr')} className="flex items-center gap-2">
          <ReactCountryFlag countryCode="TR" svg style={{ width: '16px', height: '16px' }} />
          Türkçe
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange('en')} className="flex items-center gap-2">
          <ReactCountryFlag countryCode="GB" svg style={{ width: '16px', height: '16px' }} />
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
