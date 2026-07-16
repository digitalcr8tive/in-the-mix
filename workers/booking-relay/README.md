# In The Mix booking email relay

GitHub Pages cannot send email securely on its own. This Cloudflare Worker receives the booking form, validates it, and sends the submission through Resend.

## One-time deployment

1. In this directory, install the Worker tools: `npm install`.
2. Sign in to Cloudflare: `npx wrangler login`.
3. Create a Resend API key with permission to send email.
4. Verify the sending domain in Resend. Gmail can be the destination, but it cannot be used as the Resend sender. Use a verified sender such as `bookings@your-domain.com`.
5. Set the Worker secrets:

   ```sh
   npx wrangler secret put RESEND_API_KEY
   npx wrangler secret put RESEND_FROM_EMAIL
   ```

   Enter the Resend key for the first command and the verified sender (for example, `In The Mix <bookings@your-domain.com>`) for the second.

6. Deploy it: `npm run deploy`.
7. Copy the deployed Worker URL and add it as the GitHub repository Actions variable named `BOOKING_ENDPOINT`.

The destination email is already configured in `wrangler.jsonc` as `Info.inthemixbartending@gmail.com`. The Worker accepts requests only from the live GitHub Pages origin and includes a hidden honeypot field check.
