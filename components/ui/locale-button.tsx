"use client"

import { useParams, usePathname, useRouter } from "next/navigation"
import { useState, useTransition, useEffect } from "react"
import { useTranslations } from "next-intl"
import { Flag } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const DEFAULT_LOCALE = "pt";
const languages = ["pt", "en"] as const;

export function LocaleButton() {
  const { locale } = useParams() as { locale: string }
  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const t = useTranslations("globals.languages")

  const [position, setPosition] = useState(locale || DEFAULT_LOCALE)

  useEffect(() => {
    setPosition(locale)
  }, [locale])

  function handleChangeLocale(newLocale: string) {
    setPosition(newLocale)

    const segments = pathname.split("/")
    segments[1] = newLocale 

    startTransition(() => {
      router.push(segments.join("/"))
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Flag className={isPending ? "animate-pulse" : ""} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-28">
        <DropdownMenuLabel>{t("languages")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={handleChangeLocale}>
            {languages.map((lang) => (
              <DropdownMenuRadioItem key={lang} value={lang}>
                {t(lang)}
                </DropdownMenuRadioItem>
            ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
