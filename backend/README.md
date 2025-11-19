# Trove
A modern communication-enhancement app that goes beyond “Word of the Day.” This app helps users upgrade their vocabulary, writing style, and real-world communication through daily words, idioms, smarter sentence suggestions, and practical language tools.

## How to run

Install dependencies.

```
npm install
```

Login to Vercel via browser prompt.

```
vercel login
```

Link to existing project `trove`.

```
vercel link
```

Pull environment variables.

```
vercel env pull .env
```

If running for the first time, create tables.

```
node init.js
```

Start development server.

```
vercel dev
```

Alternatively, push to production.

```
vercel --prod
```

## Calling the API

### Generate

Generate a new word every 24 hours in the style `formal`, `casual`, or `rare`. For example, to generate a formal word,

```
curl https://trove-zeta.vercel.app/api/generate?style=formal
```