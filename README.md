# idea-capture

A tiny TypeScript CLI to capture and review ideas in seconds.

## Features
- Add ideas with optional tags
- List saved ideas newest-first
- Filter ideas by tag
- Local JSON persistence
- Basic test coverage

## Stack
- Node.js 20+
- TypeScript
- Vitest

## Setup
```bash
npm install
```

## Run
```bash
npm run build
npm start -- add "Build a tiny launch tracker" --tags startup,saas
npm start -- list
```

## Test
```bash
npm test
```

## Docker
```bash
docker build -t idea-capture .
docker run --rm idea-capture
```
