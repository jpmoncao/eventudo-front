'use client';

import React from "react";
import { IEvent } from "@/interfaces/event";

interface EventPriceTagProps {
    price: number;
    promotion: IEvent['promotion'];
    locale?: string;
}

export const EventPriceTag: React.FC<EventPriceTagProps> = ({ price, promotion, locale = 'pt' }) => {
    const locales = locale === 'pt' ? 'pt-BR' : 'en-US';
    const currency = locale === 'pt' ? 'BRL' : 'USD';

    const moneyOption: Intl.NumberFormatOptions = {
        minimumFractionDigits: 2,
        style: 'currency',
        currency,
        currencyDisplay: 'symbol'
    };

    const parseSafe = (val: unknown): number => {
        const num = typeof val === 'string' ? parseFloat(val) : Number(val);
        return isNaN(num) ? 0 : num;
    };

    const isPromo = promotion?.isActive;
    const finalPrice = parseSafe(isPromo ? promotion!.price : price);

    return (
        <p className="flex items-end gap-2">
            <span className="text-3xl font-bold text-primary text-shadow-md text-shadow-primary-foreground/60">
                {finalPrice.toLocaleString(locales, moneyOption)}
            </span>
            {isPromo && (
                <span className="text-lg font-normal text-destructive line-through">
                    {price.toLocaleString(locales, moneyOption)}
                </span>
            )}
        </p>
    );
};
