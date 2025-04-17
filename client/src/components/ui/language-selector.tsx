
import { useTranslation } from 'react-i18next';
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
  const currentLanguage = i18n.language;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Globe className="h-4 w-4" />
          <div className="absolute -bottom-1 -right-1">
            <ReactCountryFlag 
              countryCode={currentLanguage === 'tr' ? 'TR' : 'GB'} 
              svg 
              style={{ width: '14px', height: '14px' }} 
            />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => i18n.changeLanguage('tr')} className="flex items-center gap-2">
          <ReactCountryFlag countryCode="TR" svg />
          Türkçe
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => i18n.changeLanguage('en')} className="flex items-center gap-2">
          <ReactCountryFlag countryCode="GB" svg />
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
