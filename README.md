# Ekeneji Tanaka Gomo — Portfolio

A responsive personal portfolio for remote help desk, IT support and client services roles, built with React, TypeScript and Vite. It has light and dark themes, a live Harare clock for remote employers, project filters and a sample support conversation.

## Run locally

```sh
npm install
npm run dev
```

## Build and check

```sh
npm run build
npm run lint
```

## Portfolio content

- Update contact details, services, support areas, client-care principles, the sample chat, skills, projects, roles and coursework in `src/content.ts`.
- The "View CV" button opens `public/ekeneji-cv-preview.png`. Replace it with a PDF and update the link when one is available.
- The contact form validates the fields in the browser and creates a draft in the visitor's email application. It does not send or store messages on a server.
- Project images live in `public/projects/`. The Titfaz Construction cover is an illustration, and the card has no link while titfazconstruction.co.zw is offline.
