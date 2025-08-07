import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // Todos os idiomas disponíveis  
  locales: ['pt', 'en'],

  // Idioma que será usado por padrão
  defaultLocale: 'pt'
});