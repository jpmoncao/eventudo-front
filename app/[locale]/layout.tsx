import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Toaster } from "@/components/ui/sonner";

import "../globals.css";

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <NextIntlClientProvider>
      {children}
      <Toaster />
    </NextIntlClientProvider>
  );
}
