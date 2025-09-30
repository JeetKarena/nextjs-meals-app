# Meals App

A modern recipe management app built with [Next.js](https://nextjs.org/), [Firebase](https://firebase.google.com/), and [Redis](https://redis.io/).

## Features

- 🔥 **Next.js App Router** for fast, scalable UI
- 🍳 **Firebase Firestore** for storing recipes
- ⚡ **Redis** for caching and performance
- 🎨 Responsive, animated UI with Tailwind CSS and Framer Motion
- 🖼️ Image optimization with Next.js
- 🌗 Dark mode support

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/JeetKarena/nextjs-meals-app.git
cd meals-app
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory with your Firebase and Redis credentials:

```env
NEXT_PUBLIC_FIREBASE_API_KEY="your-firebase-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-firebase-auth-domain"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-firebase-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-firebase-storage-bucket"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-firebase-messaging-sender-id"
NEXT_PUBLIC_FIREBASE_APP_ID="your-firebase-app-id"
NEXT_PRIVATE_REDIS_HOST="your-redis-host"
NEXT_PRIVATE_REDIS_PORT="your-redis-port"
NEXT_PRIVATE_REDIS_USERNAME="your-redis-username"
NEXT_PRIVATE_REDIS_PASSWORD="your-redis-password"
```

**Note:** Never commit `.env.local` or any secrets to GitHub.

### 4. Run the Development Server

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Deployment

You can deploy this app to [Vercel](https://vercel.com/) or any platform that supports Next.js. Make sure to set your environment variables in the deployment dashboard.

## Security

- `.env.local` is excluded by `.gitignore` and should never be committed.
- Review your commit history before pushing to ensure no secrets are leaked.

## License

MIT

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Redis Documentation](https://redis.io/documentation)