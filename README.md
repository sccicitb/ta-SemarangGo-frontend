# SemarangGo Public Information Platform

Repository for Public Information Platform: SemarangGo.

## Docs

- [Codebase](#codebase)
  - [Technologies](#technologies)
  - [Folder Structure](#folder-structure)
- [Setup](#setup)
  - [Installation](#installation)
  - [Run Test](#run-tests)
  - [Production Version](#production-version)
  - [Run Production Level Locally](#run-production-version-locally)
- [Handbook](#handbooks)

## Codebase

### Technologies

Here is a list of all the core technologies this project use:

- [yarn](https://www.npmjs.com/) -- Package manager
- [TypeScript](https://www.typescriptlang.org/docs/)
- [React](https://reactjs.org/docs/getting-started.html) -- JavaScript library for building user interfaces
- [react-router-dom](https://reactrouter.com/docs/en/v6)
- [SWR](https://swr.vercel.app/docs/getting-started)
- [axios](https://axios-http.com/docs/intro)
- [Next.js](https://nextjs.org/)

### Folder structure

```bash
src/
├── assets      # Uncompiled assets such as images, or fonts
├── atoms       # State management with Recoil
├── components  # all the reusable components used in application
├── containers  # stateful components that connect to the global state or external APIs
├── models      # Typescript model
├── pages       # Application views and routes
├── services    # implementation of external APIs and other business logic
├── styles      # styling variables
├── utils       # utility functions used throughout the application
└── variable    # Variable which use globally
```

#### Index routes

- src/pages/index.tsx -> /
- src/pages/posts/index.tsx -> /posts

#### Nested routes

- src/pages/posts/topic.tsx -> /posts/topic
- src/pages/settings/profile.tsx -> /settings/profile

#### Dynamic routes

- src/pages/posts/[slug].tsx -> /posts/:slug
- src/pages/[user]/settings.tsx -> /:user/settings
- src/pages/posts/[...all].tsx -> /posts/\*

## Setup

### Installation

Install the dependencies:

```sh
yarn install
```

Run dev server:

```sh
yarn dev
```

You can run type-checking in watch mode in another terminal, if you may:

```sh
yarn type-check --watch
```

### Run tests

```sh
yarn test
```

### Production version

To generate the production version, you can run:

```sh
yarn build
```

All files you have to deploy will be located at the `dist` directory.

### Run production version locally

To check if everything will be ok in production before the deployment, you can run this command after `yarn build`:

```sh
yarn preview
```

## Handbooks

- [Javscript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [JavaScript Style Guide](https://github.com/airbnb/javascript)
- [React Hooks cheat sheet](https://blog.logrocket.com/react-hooks-cheat-sheet-unlock-solutions-to-common-problems-af4caf699e70/)
- [Learn CSS](https://web.dev/learn/css/)
- [Learn HTML](https://www.learn-html.org/)
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
