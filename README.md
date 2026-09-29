# EVENTORA

Premium event-management platform built with Create React App + Express.

## One-command development setup

From the **EVENTORA root folder**:

```cmd
npm install
npm start
```

`npm install` also installs the server dependencies automatically.

`npm start` starts both:
- React website: http://localhost:3000
- EVENTORA API: http://localhost:5000

You do **not** need a second terminal and you should **not** run npm inside `src`.

## If you already installed the old version

Run once from EVENTORA root:

```cmd
npm install
npm start
```

## API

- `GET /api/health`
- `GET /api/caterers`
- `POST /api/events`
- `GET /api/events/:id`

## Live catering

Set `GOOGLE_PLACES_API_KEY` in `server/.env` to enable live catering business lookup. Without it, the UI clearly reports that live provider data is unavailable rather than inventing listings.


## EVENTORA signature features

- **Event DNA Builder:** clients choose the event pulse and signature moment instead of selecting a generic package.
- **Occasion colour language:** weddings, birthdays, corporate events and live shows can carry different visual identities.
- **Afterglow:** optional post-event memory/recap planning is captured in the same brief.
- **Real catering lookup:** Google Places can supply live provider information when configured.
- **Real enquiry email:** the backend sends new briefs to `vishnuharini07@gmail.com` through Resend when `RESEND_API_KEY` is configured.
- **WhatsApp:** +91 99400 58091.

### Configure email

1. Copy `server/.env.example` to `server/.env`.
2. Add a valid Resend API key.
3. For production, set `EVENTORA_FROM_EMAIL` to a sender/domain verified in Resend.
4. Restart `npm start`.

Without `RESEND_API_KEY`, the application is still stored by the API, but the email cannot be delivered.
