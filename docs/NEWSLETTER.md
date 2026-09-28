# Setting up the newsletter

The site is **100% static** - there is no backend, no database, and no way to
store subscriber emails in this repo (nor would you want to). So the email
newsletter works by handing signups off to a **third-party email provider**.

Until you connect one, the signup forms stay hidden (so nobody types an email
into a form that goes nowhere), and the on-site **"This week for you"** digest in
the **For You** tab does the real work: it's computed live in the browser.

There are signup forms in two places, both wired to the same setting:

- the **For You** tab (under your matches)
- the **site-wide band** above the footer (on every tab)

---

## 1. Pick a provider

| Provider | Why | Free tier |
|---|---|---|
| **[Buttondown](https://buttondown.com)** | Simplest. One URL, plain HTML form, no JS SDK. **Recommended.** | Yes (up to ~100 subs) |
| **[Mailchimp](https://mailchimp.com)** | Most features, templates, automation. | Yes (up to ~500 subs) |
| **[MailerLite](https://mailerlite.com)** | Clean middle ground. | Yes |

Any provider that gives you a **form `action` URL** that accepts a POST with an
`email` field will work.

---

## 2. Get your form endpoint

### Buttondown
1. Create a free account and confirm your sending email.
2. Your subscribe endpoint is:
   ```
   https://buttondown.com/api/emails/embed-subscribe/YOUR_USERNAME
   ```
   (Settings → **Embedding** shows the exact URL and a sample form.)

### Mailchimp
1. **Audience → Signup forms → Embedded form.**
2. Copy the `<form action="...">` URL. It looks like:
   ```
   https://YOURACCOUNT.usX.list-manage.com/subscribe/post?u=XXXX&id=YYYY
   ```

---

## 3. Wire it into the site

Open **`js/app.js`** and set the endpoint near the top (it's currently empty):

```js
// set to your Buttondown/Mailchimp embed-subscribe URL to enable email signup
var NEWSLETTER_ENDPOINT = "https://buttondown.com/api/emails/embed-subscribe/your-username";
```

Then **bump the cache version** so visitors get the change: in `index.html`,
search-and-replace the current `?v=NN` with the next number (e.g. `?v=27` →
`?v=28`).

That's it. The form posts `email` to your endpoint with `mode: "no-cors"`, so the
browser never sees a CORS error and the subscriber is added on the provider's side.
On submit, the helper text updates to a confirmation message.

> **Note:** with `no-cors` the browser can't read the response, so the form always
> shows the optimistic "check your inbox to confirm" message. That's expected - > the provider handles double-opt-in confirmation. To show real success/error
> states instead, switch to the provider's JSON API with a CORS-enabled request.

---

## 4. (Optional) Actually send the weekly digest

The on-site digest is generated live; the **email** is a separate send you compose
in your provider. Two ways:

- **By hand (simplest):** once a week, open your provider, write a short issue - 5 new scholarships, 3 deadlines, 2 programs - and send. The site's
  **Deadlines** and **For You** tabs are your source material.
- **Automated:** add a GitHub Action on a weekly `cron` (the scheduled
  `.github/workflows/site-build.yml` shows the pattern) that builds a digest from
  the data files and calls your provider's "create draft" API with a secret
  token, so each week's email is waiting for you to press send.

---

## How it behaves with no endpoint set

If `NEWSLETTER_ENDPOINT` is `""` (the default), both signup forms are hidden.
Nothing breaks, and no emails are collected or lost. Set the endpoint and they
appear on the next deploy.
