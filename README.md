# ZENA QR v2

ZENA Coffee için dijital QR menü ve admin yönetim paneli.

## Teknolojiler

- Next.js 16
- React 19
- TypeScript
- TailwindCSS
- Firebase Authentication
- Firebase Firestore
- Firebase Storage

## Kurulum

```bash
npm install
```

`.env.local` dosyası oluşturup Firebase değerlerini ekleyin:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

## Geliştirme

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Firebase

Bu proje Firebase Authentication, Firestore ve Storage kullanır. Firebase Console üzerinden Email/Password Authentication aktif olmalıdır.

## Vercel

Vercel deploy için `.env.local` içindeki tüm `NEXT_PUBLIC_FIREBASE_*` değişkenleri Project Settings > Environment Variables bölümüne eklenmelidir.
