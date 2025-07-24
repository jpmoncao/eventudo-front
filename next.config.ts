import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);