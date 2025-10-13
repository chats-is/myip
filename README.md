# MyIP

My IP and Network Information, Using the GeoLite2 Free GeoCN and qqwry database.

## Features

- [GeoLite2 Free](https://dev.maxmind.com/geoip/geolite2-free-geolocation-data) - MaxMind GeoLite2 Free IP geolocation data.
- [GeoCN](https://github.com/ljxi/GeoCN) - China IP geolocation data.
- [qqwry.ipdb](https://github.com/metowolf/qqwry.ipdb) - China IP geolocation data.

## Getting Started

First, run the development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Download GeoLite2 Free GeoCN and qqwry database

Add `MAXMIND_LICENSE_KEY` to the .env file.

```bash
pnpm update-db
```

## Redis cache

Implement Redis caching for Meituan IP lookup services, and add `REDIS_URL` to the .env file.

## Deploy on Vercel

You can deploy your MyIP to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/copilot-is/myip)

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
