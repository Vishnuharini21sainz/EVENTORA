# EVENTORA deployment guide

## Vercel — recommended for the full-stack version

This project now includes a Vercel-compatible Express API at `api/index.js` and a CRA frontend.

1. Push the **contents of this EVENTORA folder** to the GitHub repository root.
2. In Vercel, import the repository.
3. Leave Root Directory as `.` if EVENTORA is the repository root.
4. Build command: `npm run build`
5. Output directory: `build`
6. Add these environment variables in Vercel:
   - `EVENTORA_OFFICE_EMAIL=vishnuharini07@gmail.com`
   - `EVENTORA_OFFICE_PHONE=9940058091`
   - `RESEND_API_KEY=your_resend_key`
   - `EVENTORA_FROM_EMAIL=EVENTORA <your-verified-sender@example.com>`
   - `GOOGLE_PLACES_API_KEY=your_google_places_key`
7. Deploy.

The frontend uses relative `/api/...` requests, so it works on the same Vercel domain.

## Netlify

Netlify is configured with `netlify.toml` and a serverless Express function.

1. Import the same GitHub repository.
2. Build command: `npm run build`
3. Publish directory: `build`
4. Functions directory: `netlify/functions`
5. Add the same environment variables in Netlify.
6. Deploy.

## GitHub Pages

GitHub Pages can host the **frontend only**. It cannot run the Express email/catering backend.

If you only want a frontend demo on GitHub Pages, build the project and publish the `build` folder using GitHub Actions.
For the full application with real email/API calls, use Vercel or Netlify.

### Important GitHub Pages 404 fix

Do not upload the ZIP as a nested folder and then publish the wrong directory. The publishing source must contain the generated `index.html` at its top level. GitHub Pages requires an `index.html` at the top level of the selected publishing source.
