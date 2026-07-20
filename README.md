# Via & Russell — Wedding Invitation

A premium, cinematic digital wedding invitation for Ma. Monrovia "Via" Marzan
& Russell John Dugho, December 2, 2026 at Sefriya Farm and Orchard,
Alitagtag, Batangas. Built with React, TypeScript, Tailwind CSS, and Framer
Motion.

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build to dist/
npm run lint      # oxlint
```

## Editing content

Almost everything on the site — names, dates, venue, love story, schedule,
wedding party, gallery, RSVP behavior, gift info — is defined in one file:

```
src/data/weddingConfig.ts
```

Update that file and the whole site updates; no component code needs to
change for routine content edits.

## Replacing media

Photos and audio are referenced by fixed paths so they can be swapped
without touching code — just replace the file at the same path/filename:

| Path | Purpose |
| --- | --- |
| `public/images/couple-main.jpg` | Hero background photo |
| `public/images/bride.jpg` / `groom.jpg` | Couple introduction portraits |
| `public/images/venue.jpg` | Wedding details venue photo |
| `public/images/gallery/photo-1.jpg` … `photo-6.jpg` | Gallery grid |
| `public/audio/wedding-song.mp3` | Floating music player track |

Placeholder images currently in the repo are generated stand-ins (dark,
labeled "Coming Soon") — replace them with real photos at the same
filenames. `public/audio/wedding-song.mp3` is already the couple's chosen
track.

## RSVP backend

The RSVP form (`src/components/sections/RSVPForm.tsx`) currently submits
through `src/utils/rsvp.ts`, which simulates a submission and logs the
payload — no backend is wired up yet. That file documents the planned
integration path (Supabase table, email notifications to
`viamarzan.vm@gmail.com`, and a guest-management dashboard) and is the single
place to wire up real persistence later.
